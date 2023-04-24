/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { End, Prisma } from '@prisma/client';

import { prisma } from '../../../../utils/prisma';
import { IEndRepository } from '../IRepository/IEndRepository';

export class EndPrismaRepository implements IEndRepository {
  public async create(data: Prisma.EndCreateInput): Promise<End> {
    const create = await prisma.end.create({ data });

    return create;
  }

  public async findById(id: string): Promise<End | null> {
    const list = await prisma.end.findUnique({ where: { id } });

    return list;
  }

  public async listMany(): Promise<End[]> {
    const list = await prisma.end.findMany();

    return list;
  }
}
