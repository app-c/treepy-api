/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
  id: string;
}

@injectable()
export class findUser {
  constructor(
    @inject(process.env.USER!)
    private userRepository: IUsersRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async execute({ id }: Props): Promise<User | null> {
    const find = await this.userRepository.findUserById(id);

    if (!find) {
      throw new Err('Usuário não encontrado');
    }

    return find;
  }
}
