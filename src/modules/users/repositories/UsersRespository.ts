/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient, User } from '@prisma/client';
import { IEndDto, IUserDtos } from '@shared/dtos';

import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
  private prisma = new PrismaClient();

  public async findUserByEmail(email: string): Promise<User | null> {
    const us = await this.prisma.user.findFirst({
      where: { email },
    });

    return us;
  }

  public async findUserById(id: string): Promise<User | null> {
    const us = await this.prisma.user.findUnique({
      where: { id },
      include: {
        end: true,
        profile: true,
      },
    });

    return us;
  }

  public async create(data: IUserDtos, end: IEndDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        midle_name: data.midle_name,
        email: data.email,
        password: data.password,
        end: {
          create: {
            city: end.city,
            bairro: end.bairro,
            cep: end.cep,
            number_home: end.number_home,
            state: end.state,
            street: end.street,
          },
        },

        profile: {
          create: {
            avatar: 'avatar',
          },
        },
      },
    });

    return user;
  }
}
