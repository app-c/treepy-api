/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { env } from 'env';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
  full_name: string;
  email: string;
  password: string;
  cpf: string;
  phone_are: string;
  phone_number: string;

  street: string;
  locality: string;
  home_number: string;
  city: string;
  state: string;
  region_code: string;
  postal_code: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('User')
    private userRepository: IUsersRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async execute({
    full_name,
    password,
    email,
    street,
    home_number,
    cpf,
    locality,
    phone_are,
    phone_number,
    postal_code,
    region_code,
    city,
    state,
  }: Props): Promise<any> {
    const find = await this.userRepository.findUserByEmail(email);

    // if (find) {
    //   throw new Err(
    //     'Esse usuário já está cadastrado. Tente novamente com um email diferente',
    //   );
    // }

    const has = await hash(password, 8);

    // const dataUser = {
    //   full_name,
    //   email,
    //   password: has,
    //   cpf,
    //   phone_are,
    //   phone_number,
    // };

    // const dataEnd = {
    //   street,
    //   locality,
    //   home_number,
    //   city,
    //   state,
    //   region_code,
    //   postal_code,
    // };

    // const createUser = await this.userRepository.create(dataUser, dataEnd);

    // await this.cache.invalidate('users');

    console.log(email);

    return 'createUser';
  }
}
