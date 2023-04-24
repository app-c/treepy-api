import { Prisma, End } from '@prisma/client';

export interface IEndRepository {
  create(data: Prisma.EndCreateInput): Promise<End>;
  findById(id: string): Promise<End | null>;
  listMany(): Promise<End[]>;
}
