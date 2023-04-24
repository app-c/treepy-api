/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { endService } from '@modules/End/services/endService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class EndController {
  async create(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(endService);

    const {} = req.body;

    const create = await service.create({});

    return res.json(create);
  }

  async listMany(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(endService);

    const list = await service.listMany();

    return res.json(list);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(endService);
    const id = req.params;

    const list = await service.findById({ id: String(id) });

    return res.json(list);
  }
}
