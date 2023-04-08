/* eslint-disable @typescript-eslint/no-unused-vars */
import { End, Prisma } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/Cache/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IEndRepository } from '../repositories/IRepository/IEndRepository';

interface props {
  id: string;
}

@injectable()
export class endService {
  constructor(
    @inject(process.env.End!)
    private repoEnd: IEndRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) {}

  async create({}: Prisma.End.CreateInput): Promise<End> {}

  async findById({ id }: props): Promise<End> {
    const list = await this.repoEnd.findById(id);

    if (!list) {
      throw new Err('Nada encontrado');
    }

    return list;
  }

  async listMany(): Promise<End[]> {
    const list = await this.repoEnd.listMany();

    return list;
  }
}
