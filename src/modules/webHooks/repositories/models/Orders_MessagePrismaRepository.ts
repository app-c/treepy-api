/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WebHooks, Prisma } from '@prisma/client';

import { prisma } from '../../../../utils/prisma';
import { IWebhookRepository } from '../IRepository/IWebhook-repository';

export class WebHooksPrismaRepository implements IWebhookRepository {
  public async create(data: Prisma.WebHooksCreateInput): Promise<WebHooks> {
    const create = await prisma.webHooks.create({ data });

    return create;
  }

  public async findById(id: string): Promise<WebHooks | null> {
    const list = await prisma.webHooks.findUnique({ where: { id } });

    return list;
  }

  public async listMany(): Promise<WebHooks[]> {
    const list = await prisma.webHooks.findMany();

    return list;
  }
}
