/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
  name: string;
  midle_name: string;
  password: string;
  email: string;
  street: string;
  bairro: string;
  number_home: string;
  city: string;
  state: string;
  cep: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject(process.env.USER!)
    private userRepository: IUsersRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async execute({
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
  }: Props): Promise<User> {
    const find = await this.userRepository.findUserByEmail(email);

    if (find) {
      throw new Err(
        'Esse usuário já está cadastrado. Tente novamente com um email diferente',
      );
    }

    const has = await hash(password, 8);
    const dataUser = {
      name,
      midle_name,
      password: has,
      email,
    };

    const dataEnd = {
      street,
      bairro,
      city,
      state,
      cep,
      number_home,
    };

    const createUser = await this.userRepository.create(dataUser, dataEnd);

    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);

    return createUser;
  }
}
