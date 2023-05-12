/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient, User, Prisma } from '@prisma/client';
import { IEndDto, IUserDtos } from '@shared/dtos';

import { prisma } from '../../../utils/prisma';
import { IPermission } from '../dto';
import { IUsersRepository } from './IUsersRespository';

export class UsersRespository implements IUsersRepository {
  public async findUserByEmail(email: string): Promise<User | null> {
    const us = await prisma.user.findFirst({
      where: { email },
    });

    return us;
  }

  public async findUserById(id: string): Promise<User | null> {
    const us = await prisma.user.findUnique({
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
    permission: IPermission,
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
        end: {
          create: end,
        },
        Permissons: {
          create: permission,
        },
      },
    });

    return user;
  }

  public async findCpf(cpf: string): Promise<User | null> {
    const find = await prisma.user.findUnique({ where: { cpf } });

    return find;
  }

  public async resePassWord(password: string, user_id: string): Promise<void> {
    await prisma.user.update({
      where: { id: user_id },
      data: {
        password,
      },
    });
  }
}
