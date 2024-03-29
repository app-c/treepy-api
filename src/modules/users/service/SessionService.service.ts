/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import auth from '@config/auth';
import { Err } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    full_name: string;
    email: string
  };
  token: string;
}

const USER = process.env.USER!;

@injectable()
export class SessionService {
  constructor(
    @inject(USER)
    private userRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const findUser = await this.userRepository.findUserByEmail(email);

    if (!findUser) {
      throw new Err('usuario nao encontrado');
    }

    const compareHash = await compare(password, findUser.password!);
    if (!compareHash) {
      throw new Err('senha invalida');
    }
    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, {
      subject: findUser.id,
      expiresIn,
    });

    const user = {
      user: {
        id: findUser.id,
        full_name: findUser.full_name,
        email: findUser.email,
      },
      token,
    };

    return user;
  }
}
