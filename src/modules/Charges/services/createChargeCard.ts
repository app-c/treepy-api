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
import { IChargesRepository } from '../repositories/IRepository/IChargesRepository';

interface props {
  fk_user_id: string;
  name: string;
  email: string;
  area: string;
  phone_number: string;
  tax_id: string;
  amount: string;
  street: string;
  home_number: string;
  complement: string;
  locality: string;
  city: string;
  region_code: string;
  postal_code: string;
  installments: string;
  number_card: string;
  exp_month: string;
  exp_year: string;
  security_code: string;
  holder_name: string;
}

@injectable()
export class createChargeCard {
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
    installments,
    number_card,
    exp_month,
    exp_year,
    security_code,
    holder_name,
  }: props): Promise<Charges> {
    const pag = axios.create({
      baseURL: 'https://sandbox.api.pagseguro.com/',
    });

    pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

    let data = {} as IChargeDto;
    let sumary = {} as ISumary;

    let message = '';
    const reference_id = uuidv4();

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
        notification_urls: [
          'https://treepy.app-com.digital/orders/create-orders_message',
        ],
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
          const charge = rs.charges[0];

          data = {
            amount: rs.charges[0].amount.value,
            status: charge.status,
            fk_user_id,
            reference_id,
            payment_method: charge.payment_method.type,
            charge_id: charge.id,
          };

          sumary = {
            paid: charge.amount.summary.paid,
            total: charge.amount.summary.total,
          };
        }
      })
      .catch(h => {
        console.log(h.response.data.error_messages);
      });

    if (message === 'Pagamento recusado') {
      throw new Err('Pagamento recusado', 401);
    }

    const create = await this.repoCharges.create(data, sumary);

    return create;
  }

  async findById(id: string): Promise<Charges> {
    const list = await this.repoCharges.findById(id);

    if (!list) {
      throw new Err('Nada encontrado');
    }

    return list;
  }

  async listMany(): Promise<Charges[]> {
    const list = await this.repoCharges.listMany();

    return list;
  }
}
