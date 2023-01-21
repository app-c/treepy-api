/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { SessionService } from '@modules/users/service/SessionService.service';
import { UpdateSenha } from '@modules/users/service/UpdatePass';
import axios from 'axios';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAvatar } from '../../service/Profile/UpdateAvatar';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(CreateUserService);

    const {
      name,
      email,
      password,
      midle_name,
      street,
      bairro,
      number_home,
      city,
      state,
      cep,
    } = req.body;

    const api = axios.create({
      baseURL: 'https://sandbox.api.pagseguro.com/orders',
    });
    api.defaults.headers.common.Authorization =
      'Bearer BFAE13863026463B83BA618DDCD40ACE';
    await api

      .post('', {
        reference_id: 'ex-00001',
        customer: {
          name,
          email: 'email@test.com',
          tax_id: '12345678909',
          phones: [
            {
              country: '55',
              area: '11',
              number: '999999999',
              type: 'MOBILE',
            },
          ],
        },
        items: [
          {
            name: 'nome do item',
            quantity: 1,
            unit_amount: 500,
          },
        ],
        qr_codes: [
          {
            amount: {
              value: 500,
            },
            expiration_date: '2023-01-29T20:15:59-03:00',
          },
        ],
        notification_urls: ['https://meusite.com/notificacoes'],
      })
      .then(h => console.log(h.status))
      .catch(h => console.log(h.status, h.statusText));

    const user = await service.execute({
      name,
      midle_name,
      password,
      email,
      street,
      bairro,
      number_home,
      city,
      state,
      cep,
    });

    return res.json(user);
  }

  async session(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(SessionService);

    const { email, password } = req.body;

    const sess = await service.execute({
      email,
      password,
    });

    return res.json(sess);
  }
}
