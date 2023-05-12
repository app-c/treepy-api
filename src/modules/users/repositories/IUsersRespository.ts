import { Prisma, Profile, User } from '@prisma/client';
import { IEndDto } from '@shared/dtos';

import { IPermission } from '../dto';

export interface IUsersRepository {
  create(
    data: Prisma.UserCreateInput,
    end: IEndDto,
    permission: IPermission,
  ): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  findCpf(cpf: string): Promise<User | null>;
  resePassWord(password: string, user_id: string): Promise<void>;
}
