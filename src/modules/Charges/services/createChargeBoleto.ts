/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResponseCard } from '@modules/payment/dtos';
import { Charges, Prisma } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import axios from 'axios';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../../shared/env';
import { IChargeDto, ISumary } from '../dto';
import { charges } from '../http/routes/charges';
import { IChargesRepository } from '../repositories/IRepository/IChargesRepository';

interface props {
  fk_user_id: string;
  name: string;
  email: string;
  area: string;
  phone_number: string;
  tax_id: string;
  amount: number;
  street: string;
  home_number: string;
  complement: string;
  locality: string;
  city: string;
  region_code: string;
  postal_code: string;
  due_date: string;
  region: string;
}

@injectable()
export class createChargeBoleto {
  constructor(
    @inject('Charge')
    private repoCharges: IChargesRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async create({
    fk_user_id,
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
    due_date,
    region,
  }: props): Promise<any> {
    const pag = axios.create({
      baseURL: 'https://sandbox.api.pagseguro.com/',
    });

    pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

    let data = {} as IChargeDto;
    let sumary = {} as ISumary;

    const message = '';
    const reference_id = uuidv4();
    let links: any[] = [];

    await pag
      .post('/orders', {
        reference_id,
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
            reference_id,
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
            reference_id,
            description: 'Compra de TreepyCache pelo site www.treepy.com.br',
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
                  name,
                  tax_id,
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
        const rs = h.data as IResponseCard;

        console.log(rs);

        if (rs.charges[0].status === 'WAITING') {
          const charge = rs.charges[0];

          data = {
            amount: rs.charges[0].amount.value,
            status: charge.status,
            fk_user_id,
            reference_id,
            charge_id: charge.id,
            payment_method: charge.payment_method.type,
          };

          sumary = {
            paid: charge.amount.summary.paid,
            total: charge.amount.summary.total,
          };

          links = charge.links;
        }
      })
      .catch(h => {
        console.log(h.response.data.error_messages);
      });

    const create = await this.repoCharges.create(data, sumary);

    const response = {
      create,
      links,
    };

    return response;
  }
}
