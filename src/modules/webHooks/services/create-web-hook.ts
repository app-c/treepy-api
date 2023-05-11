/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma, WebHooks } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IWebhookRepository } from '../repositories/IRepository/IWebhook-repository';

interface props {
  id: string;
}

@injectable()
export class createWebhook {
  constructor(
    @inject('OrderMessage')
    private repoOrders_Message: IWebhookRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async create(message: string): Promise<any> {
    const create = await this.repoOrders_Message.create({ message });

    return create;
  }

  async findById({ id }: props): Promise<WebHooks> {
    const list = await this.repoOrders_Message.findById(id);

    if (!list) {
      throw new Err('Nada encontrado');
    }

    return list;
  }

  async listMany(): Promise<WebHooks[]> {
    const list = await this.repoOrders_Message.listMany();

    return list;
  }
}
