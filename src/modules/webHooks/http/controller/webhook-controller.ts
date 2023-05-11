/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createWebhook } from '@modules/webHooks/services/create-web-hook';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class WebhookController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createWebhook);

    const message = req.body;

    const ser = await service.create(JSON.stringify(message));
    return res.json(ser);
  }

  async listMany(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createWebhook);

    const list = await service.listMany();

    return res.json(list);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createWebhook);
    const id = req.params;

    const list = await service.findById({ id: String(id) });

    return res.json(list);
  }
}
