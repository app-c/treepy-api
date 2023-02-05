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
    name: string;
    midle_name: string;
  };
  token: string;
}

@injectable()
export class SessionService {
  constructor(
    @inject('PrismaUser')
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
        name: findUser.name,
        midle_name: findUser.midle_name,
        email: findUser.email,
      },
      token,
    };

    return user;
  }
}
