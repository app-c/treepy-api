import { Prisma, WebHooks } from '@prisma/client';

export interface IWebhookRepository {
  create(data: Prisma.WebHooksUncheckedCreateInput): Promise<WebHooks>;
  findById(id: string): Promise<WebHooks | null>;
  listMany(): Promise<WebHooks[]>;
}
