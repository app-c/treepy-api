import { Profile, User } from '@prisma/client';
import { IEndDto, IProfileDto, IUserDtos } from '@shared/dtos';

export interface IUsersRepository {
  create(data: IUserDtos, end: IEndDto): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}
