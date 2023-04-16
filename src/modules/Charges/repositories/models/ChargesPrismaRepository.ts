/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IChargeDto, ISumary } from '@modules/Charges/dto';
import { Charges, Prisma } from '@prisma/client';

import { prisma } from '../../../../utils/prisma';
import { IChargesRepository } from '../IRepository/IChargesRepository';

export class ChargesPrismaRepository implements IChargesRepository {
  public async create(data: IChargeDto, sumary: ISumary): Promise<Charges> {
    const create = await prisma.charges.create({
      data: {
        ...data,
        sumary: {
          create: {
            paid: sumary.paid,
            total: sumary.total,
          },
        },
      },
    });

    return create;
  }

  public async findById(id: string): Promise<Charges | null> {
    const list = await prisma.charges.findUnique({ where: { id } });

    return list;
  }

  public async listMany(): Promise<Charges[]> {
    const list = await prisma.charges.findMany();

    return list;
  }
}
