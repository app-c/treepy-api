"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pay = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _express = require("express");
var _xml2js = _interopRequireDefault(require("xml2js"));
var _env = require("../../../../env");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const pagseg = new Pag({
//   email: 'william@app-com.digital',
//   token: '4033C10F0000C47AA4AF7F85B5EC75F5',
//   mode: 'sandbox',
// });

const pay = (0, _express.Router)();
exports.pay = pay;
const pag = _axios.default.create({
  baseURL: 'https://sandbox.api.pagseguro.com/'
});
pay.post('/session', async (req, res) => {
  const resp = await pag.post('/sessions?appId=app5679017007&appKey=4033C10F0000C47AA4AF7F85B5EC75F5');
  const rs = resp.data;
  const dt = null;
  const parser = new _xml2js.default.Parser();
  parser.parseString(rs, (err, result) => {
    return res.json(result);
  });
});
pay.post('/brand', async (req, res) => {
  const {
    tk,
    creditCard
  } = req.body;
  const resp = await _axios.default.get('https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin', {
    params: {
      tk,
      creditCard
    }
  });
  return res.json(resp.data);
});
pay.post('/parc', async (req, res) => {
  const {
    installment,
    brand,
    amount,
    sessionId
  } = req.body;
  const resp = await _axios.default.get(' https://sandbox.pagseguro.uol.com.br/checkout/v2/installments.json', {
    params: {
      sessionId,
      amount,
      creditCardBrand: brand,
      maxInstallmentNoInterest: installment
    }
  });
  return res.json(resp.data);
});
pay.post('/card', async (req, res) => {
  pag.defaults.headers.common.Authorization = `Bearer ${_env.env.PAG_TOKEN}`;
  const {
    name,
    email,
    area,
    phone_number,
    name_item,
    reference_item_id,
    amount,
    street,
    home_number,
    complement,
    locality,
    city,
    region_code,
    postal_code,
    description,
    installments,
    number_card,
    exp_month,
    exp_year,
    security_code,
    holder_name
  } = req.body;
  const id = '12345';
  await pag.post('/orders', {
    reference_id: 'ex-00001',
    customer: {
      name,
      email,
      tax_id: '12345678909',
      phones: [{
        country: '55',
        area,
        number: phone_number,
        type: 'MOBILE'
      }]
    },
    items: [{
      reference_id: '123',
      name: 'Treepycache',
      quantity: 1,
      unit_amount: amount
    }],
    shipping: {
      address: {
        street,
        number: home_number,
        complement,
        locality,
        city,
        region_code,
        country: 'BRA',
        postal_code
      }
    },
    notification_urls: ['https://meusite.com/notificacoes'],
    charges: [{
      reference_id: '123',
      description: 'Compra de TreepyCache pelo site www.treepy.com.br',
      amount: {
        value: amount,
        currency: 'BRL'
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
            name: holder_name
          },
          store: true
        }
      }
    }]
  }).then(h => {
    const rs = h.data;
    console.log(rs);
    return res.json(rs);
  }).catch(h => {
    console.log(h);
    // return res.json(h.response);
  });
});