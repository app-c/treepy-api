/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient, User, Prisma } from '@prisma/client';
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

  public async create(
    data: Prisma.UserCreateInput,
    end: IEndDto,
  ): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        phone_are: data.phone_are,
        phone_number: data.phone_number,
        end: {
          create: {
            street: end.street,
            locality: end.locality,
            number_home: end.home_number,
            city: end.city,
            state: end.city,
            region_code: end.region_code,
            postal_code: end.postal_code,
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
