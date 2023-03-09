/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateUserService } from '@modules/users/service/CreateUserService';
import { findUser } from '@modules/users/service/findUserService';
import { SendForgotPasswordEmailService } from '@modules/users/service/SendForgotPasswordEmailService';
import { SessionService } from '@modules/users/service/SessionService.service';
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

  async sendForgotPassword(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(SendForgotPasswordEmailService);

    const { email } = req.body;

    const sess = await service.execute({
      email,
    });

    return res.json(sess);
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(findUser);

    const { id } = req.user;

    const sess = await service.execute({
      id,
    });

    return res.json(sess);
  }
}
