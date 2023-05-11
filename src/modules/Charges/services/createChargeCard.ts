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
import { paymentResponse } from '../../../utils/payment-response';
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
  security_code: string;
  holder_name: string;
  encrypted: string;
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
    encrypted,
  }: props): Promise<any> {
    const url_dev = 'https://sandbox.api.pagseguro.com/';
    const url_production = 'https://api.pagseguro.com/';

    const pag = axios.create({
      baseURL: url_production,
    });

    pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_PRODUCTION_TOKEN}`;

    let data = null;
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
        notification_urls: ['https://treepy.app-com.digital/hook'],
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
                encrypted,
                security_code: '123',
                holder: {
                  name: 'Jose da Silva',
                },
                store: false,
              },
            },
          },
        ],
      })
      .then(async h => {
        const rs = h.data as IResponseCard;

        if (rs.charges[0].status === 'DECLINED') {
          data = rs.charges[0];
          message = paymentResponse[rs.charges[0].payment_response.code];
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

          await this.repoCharges.create(data, sumary);
        }
      })
      .catch(h => {
        data = h.response.data.error_messages;
      });

    if (message !== '') {
      throw new Err(
        'Erro ao processar o pagamento, verefique os campos ou contate o seu banco',
        401,
      );
    }

    return { data, message };
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
