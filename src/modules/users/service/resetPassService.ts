/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { env } from '../../../shared/env';
import { IUsersRepository } from '../repositories/IUsersRespository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface Props {
  password: string;
  token: string;
}

@injectable()
export class resePassService {
  constructor(
    @inject(env.USER)
    private userRepository: IUsersRepository,

    @inject(env.USER_TOKEN)
    private userToken: IUserTokenRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async execute({ password, token }: Props): Promise<any> {
    const userToken = await this.userToken.findByToken(token);

    if (!userToken) {
      throw new Err('Token inválido');
    }
    const user = await this.userRepository.findUserById(userToken.user_id);

    if (!user) {
      throw new Err('Usuário não encontrado');
    }

    const pass = await hash(password, 8);

    await this.userRepository.resePassWord(pass, user.id);

    return user;
  }
}
