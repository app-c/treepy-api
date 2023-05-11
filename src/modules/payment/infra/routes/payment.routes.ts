import { IResponseCard } from '@modules/payment/dtos';
import { Err } from '@shared/errors/AppError';
import sdk from 'api/@devpagseguro/v2.0#3izr7l2skylmkrvs';
import axios from 'axios';
import { Router } from 'express';
import parseXml from 'xml2js';

import { env } from '../../../../shared/env';

// const pagseg = new Pag({
//   email: 'william@app-com.digital',
//   token: '4033C10F0000C47AA4AF7F85B5EC75F5',
//   mode: 'sandbox',
// });

const pay = Router();
const pag = axios.create({
  baseURL: 'https://api.pagseguro.com/',
});

pay.get('/session', async (req, res) => {
  const resp = await axios.post(
    ` https://ws.sandbox.pagseguro.uol.com.br/sessions?appId=${env.APP_ID}&appKey=${env.APP_KEY}`,
  );
  const rs = resp.data;
  const parser = new parseXml.Parser();
  parser.parseString(rs, (err, result) => {
    const token_id = {
      id: result.session.id[0],
    };
    return res.json(token_id);
  });
});

pay.get('/brand', async (req, res) => {
  const { tk, creditCard } = req.params;
  const resp = await axios.get(
    'https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin',
    {
      params: {
        tk,
        creditCard,
      },
    },
  );

  return res.json(resp.data);
});

pay.get('/parc/:value', async (req, res) => {
  const { value } = req.params;
  pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_PRODUCTION_TOKEN}`;

  await pag
    .get(`/charges/fees/calculate?payment_methods=credit_card&value=${value}`)
    .then(h => {
      const rs = h.data;
      return res.json(rs);
    })
    .catch(h => res.json(h.response.data));
  // const { installment, brand, amount, sessionId } = req.body;

  // const resp = await axios.get(
  //   ' https://sandbox.pagseguro.uol.com.br/checkout/v2/installments.json',
  //   {
  //     params: {
  //       sessionId,
  //       amount,
  //       creditCardBrand: brand,
  //       maxInstallmentNoInterest: installment,
  //     },
  //   },
  // );
});

pay.post('/card', async (req, res) => {
  pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

  const {
    name,
    email,
    area,
    phone_number,
    tax_id,
    amount,
    street,
    home_number,
    complement,
    locality,
    city,
    region_code,
    postal_code,
    installments,
    number_card,
    exp_month,
    exp_year,
    security_code,
    holder_name,
  } = req.body;

  let message = '';
  let data = {};

  await pag
    .post('/orders', {
      reference_id: 'ex-00001',
      customer: {
        name,
        email,
        tax_id,
        phones: [
          {
            country: '55',
            area,
            number: phone_number,
            type: 'MOBILE',
          },
        ],
      },
      items: [
        {
          reference_id: '123',
          name: 'Treepycache',
          quantity: 1,
          unit_amount: amount,
        },
      ],
      shipping: {
        address: {
          street,
          number: home_number,
          complement,
          locality,
          city,
          region_code,
          country: 'BRA',
          postal_code,
        },
      },
      notification_urls: ['https://meusite.com/notificacoes'],
      charges: [
        {
          reference_id: '123',
          description: 'Compra de TreepyCache pelo site www.treepy.com.br',
          amount: {
            value: amount,
            currency: 'BRL',
          },
          payment_method: {
            type: 'CREDIT_CARD',
            installments,
            capture: true,
            card: {
              number: number_card,
              exp_month,
              exp_year,
              security_code,
              holder: {
                name: holder_name,
              },
              store: true,
            },
          },
        },
      ],
    })
    .then(h => {
      const rs = h.data as IResponseCard;

      if (rs.charges[0].status === 'DECLINED') {
        message = 'Pagamento recusado';
      }

      if (
        rs.charges[0].status === 'PAID' ||
        rs.charges[0].status === 'AUTHORIZED'
      ) {
        data = rs;
      }
    })
    .catch(h => {
      console.log(h.response);
      return res.json(h);
    });

  if (message === 'Pagamento recusado') {
    throw new Err('Pagamento recusado', 401);
  }

  return res.json(data);
});

pay.post('/boleto', async (req, res) => {
  pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

  const {
    name,
    email,
    area,
    phone_number,
    amount,
    street,
    home_number,
    complement,
    locality,
    city,
    region_code,
    postal_code,
    holder_name,
    due_date,
    region,
  } = req.body;

  await pag
    .post('/orders', {
      reference_id: 'ex-00001',
      customer: {
        name,
        email,
        tax_id: '12345678909',

        phones: [
          {
            country: '55',
            area,
            number: phone_number,
            type: 'MOBILE',
          },
        ],
      },

      items: [
        {
          reference_id: 'treepycache',
          name: 'TreepyCache',
          quantity: 1,
          unit_amount: amount,
        },
      ],

      shipping: {
        address: {
          street,
          number: home_number,
          complement,
          locality,
          city,
          region_code,
          country: 'BRA',
          postal_code,
        },
      },

      notification_urls: ['https://meusite.com/notificacoes'],
      charges: [
        {
          reference_id: 'treepycache',
          description: 'Compra de TreepyCache',
          amount: {
            value: amount,
            currency: 'BRL',
          },

          payment_method: {
            type: 'BOLETO',
            boleto: {
              due_date,
              instruction_lines: {
                line_1: 'Pagamento processado para DESC Fatura',
                line_2: 'Via Treepy',
              },
              holder: {
                name: holder_name,
                tax_id: '22222222222',
                email,
                address: {
                  country: 'Brasil',
                  region,
                  region_code,
                  city,
                  postal_code,
                  street,
                  number: home_number,
                  locality,
                },
              },
            },
          },
        },
      ],
    })
    .then(h => {
      const rs = h.data;
      return res.json(rs);
    })
    .catch(h => {
      console.log(h);
    });
});

pay.post('/pix', async (req, res) => {
  pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

  const {
    name,
    email,
    area,
    phone_number,
    amount,
    street,
    home_number,
    complement,
    locality,
    city,
    region_code,
    postal_code,
    expiration_date,
  } = req.body;

  await pag
    .post('/orders', {
      reference_id: 'ex-00001',
      customer: {
        name,
        email,
        tax_id: '12345678909',
        phones: [
          {
            country: '55',
            area,
            number: phone_number,
            type: 'MOBILE',
          },
        ],
      },
      items: [
        {
          name: 'TreepyCache',
          quantity: 1,
          unit_amount: amount,
        },
      ],
      qr_codes: [
        {
          amount: {
            value: amount,
          },
          expiration_date,
        },
      ],
      shipping: {
        address: {
          street,
          number: home_number,
          complement,
          locality,
          city,
          region_code,
          country: 'BRA',
          postal_code,
        },
      },
      notification_urls: ['https://meusite.com/notificacoes'],
    })
    .then(h => {
      const rs = h.data;
      return res.json(rs);
    })
    .catch(h => {
      console.log(h);
    });
});

export { pay };
