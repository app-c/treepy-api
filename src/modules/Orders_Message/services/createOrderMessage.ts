/* eslint-disable @typescript-eslint/no-unused-vars */
import { Orders_Message, Prisma } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IOrders_MessageRepository } from '../repositories/IRepository/IOrders_MessageRepository';

interface props {
  id: string;
}

@injectable()
export class createOrderMessage {
  constructor(
    @inject('OrderMessage')
    private repoOrders_Message: IOrders_MessageRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async create(message: string): Promise<any> {
    const create = await this.repoOrders_Message.create({ message });
    console.log(message);

    return create;
  }

  async findById({ id }: props): Promise<Orders_Message> {
    const list = await this.repoOrders_Message.findById(id);

    if (!list) {
      throw new Err('Nada encontrado');
    }

    return list;
  }

  async listMany(): Promise<Orders_Message[]> {
    const list = await this.repoOrders_Message.listMany();

    return list;
  }
}
