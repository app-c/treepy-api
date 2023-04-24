/* eslint-disable @typescript-eslint/no-unused-vars */
import { IResponseCard } from '@modules/payment/dtos';
import { Charges, Prisma } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import axios from 'axios';
import { hash } from 'bcryptjs';
import moment from 'moment';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { env } from '../../../env';
import { IChargeDto, IPix, ISumary } from '../dto';
import { charges } from '../http/routes/charges';
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
}

@injectable()
export class createChargePix {
  constructor(
    @inject('Charge')
    private repoCharges: IChargesRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async create({
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
  }: props): Promise<any> {
    const pag = axios.create({
      baseURL: 'https://sandbox.api.pagseguro.com/',
    });

    pag.defaults.headers.common.Authorization = `Bearer ${env.PAG_TOKEN}`;

    let data = {};
    const sumary = {} as ISumary;

    let error = '';
    const reference_id = uuidv4();
    const expiration_date = moment().isLocal;

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
        const rs = h.data as IPix;

        const code = rs.qr_codes[0];

        data = {
          qrcode_image: rs.qr_codes[0].links[0].href,
          expiration_date: code.expiration_date,
          text: code.text,
        };
      })
      .catch(h => {
        error = h.response.data;
      });

    if (error !== '') {
      throw new Err(error, 401);
    }

    return data;
  }
}
