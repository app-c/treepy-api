/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Orders_Message, Prisma } from '@prisma/client';
import { prisma } from 'utils/prisma';

import { IOrders_MessageRepository } from '../IRepository/IOrders_MessageRepository';

export class Orders_MessagePrismaRepository
  implements IOrders_MessageRepository
{
  public async create(
    data: Prisma.Orders_MessageCreateInput,
  ): Promise<Orders_Message> {
    const create = await prisma.orders_Message.create({ data });

    return create;
  }

  public async findById(id: string): Promise<Orders_Message | null> {
    const list = await prisma.orders_Message.findUnique({ where: { id } });

    return list;
  }

  public async listMany(): Promise<Orders_Message[]> {
    const list = await prisma.orders_Message.findMany();

    return list;
  }
}
