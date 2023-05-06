/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createOrderMessage } from '@modules/Orders_Message/services/createOrderMessage';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class Orders_MessageController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createOrderMessage);

    const message = req.body;

    const ser = await service.create(JSON.stringify(message));
    return res.json(ser);
  }

  async listMany(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createOrderMessage);

    const list = await service.listMany();

    return res.json(list);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createOrderMessage);
    const id = req.params;

    const list = await service.findById({ id: String(id) });

    return res.json(list);
  }
}
