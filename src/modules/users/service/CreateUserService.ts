/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { IEndDto, IUserDtos } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IPermission } from '../dto';
import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
  full_name: string;
  email: string;
  password: string;
  cpf: string;
  phone_area: string;
  phone_number: string;
  street: string;
  locality: string;
  home_number: string;
  city: string;
  state: string;
  region_code: string;
  postal_code: string;
  termos: boolean;
  notifications: boolean;
}

interface IResponse {
  user: IUserDtos;
  end: IEndDto;
  permissions: IPermission;
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
    full_name,
    email,
    password,
    cpf,
    phone_area,
    phone_number,
    street,
    locality,
    home_number,
    city,
    state,
    region_code,
    postal_code,
    notifications,
    termos,
  }: Props): Promise<IResponse> {
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

    const has = await hash(password, 8);
    const user = {
      full_name,
      email,
      password: has,
      cpf,
      phone_area,
      phone_number,
    };

    const end = {
      street,
      locality,
      home_number,
      region_code,
      postal_code,
      city,
      state,
    };

    const permissions = {
      notifications,
      termos,
    };

    // await this.cache.invalidate('user');
    const createUser = await this.userRepository.create(user, end, permissions);

    return {
      user: createUser,
      end,
      permissions,
    };
  }
}
