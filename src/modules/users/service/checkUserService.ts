/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
  email: string;
  cpf: string;
}

@injectable()
export class checkMailService {
  constructor(
    @inject(process.env.USER!)
    private userRepository: IUsersRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async execute({ email, cpf }: Props): Promise<void> {
    const find = await this.userRepository.findUserByEmail(email);
    const findCpf = await this.userRepository.findCpf(cpf);

    if (find) {
      throw new Err(
        'Esse usuário já está cadastrado. Tente novamente com um email diferente',
      );
    }

    if (findCpf) {
      throw new Err(
        'CPF já está cadastrado. Tente novamente com um CPF diferente',
      );
    }

    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);
  }
}
