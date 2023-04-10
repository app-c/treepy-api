import { Prisma, Profile, User } from '@prisma/client';
import { IEndDto } from '@shared/dtos';

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput, end: IEndDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  findCpf(cpf: string): Promise<User | null>;
}
