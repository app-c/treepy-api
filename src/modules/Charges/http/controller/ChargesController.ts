/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createChargeBoleto } from '@modules/Charges/services/createChargeBoleto';
import { createChargeCard } from '@modules/Charges/services/createChargeCard';
import { createChargePix } from '@modules/Charges/services/createChargePix';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ChargesController {
  async card(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createChargeCard);

    const {
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
      installments,
      security_code,
      holder_name,
      encrypted,
    } = req.body;

    const fk_user_id = req.user.id;

    const create = await service.create({
      fk_user_id,
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
      installments,
      security_code,
      holder_name,
      encrypted,
    });

    return res.json(create);
  }

  async boleto(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createChargeBoleto);

    const {
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
      due_date,
      region,
    } = req.body;

    const fk_user_id = req.user.id;

    const create = await service.create({
      fk_user_id,
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
      due_date,
      region,
    });

    return res.json(create);
  }

  async pix(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createChargePix);

    const {
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
    } = req.body;

    const fk_user_id = req.user.id;

    const create = await service.create({
      fk_user_id,
      name,
      email,
      area,
      phone_number,
      tax_id,
      amount,
      street,
      home_number,
      complement,
      locality,
      city,
      region_code,
      postal_code,
    });

    return res.json(create);
  }

  async listMany(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createChargeCard);

    const list = await service.listMany();

    return res.json(list);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(createChargeCard);
    const id = req.params;

    const list = await service.findById(id);

    return res.json(list);
  }
}
