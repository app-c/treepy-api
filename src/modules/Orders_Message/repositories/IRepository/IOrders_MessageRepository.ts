import { Prisma, Orders_Message } from '@prisma/client';

export interface IOrders_MessageRepository {
  create(data: Prisma.Orders_MessageCreateInput): Promise<Orders_Message>;
  findById(id: string): Promise<Orders_Message | null>;
  listMany(): Promise<Orders_Message[]>;
}
