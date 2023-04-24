import { IChargeDto, ISumary } from '@modules/Charges/dto';
import { Prisma, Charges } from '@prisma/client';

export interface IChargesRepository {
  create(data: IChargeDto, sumary: ISumary): Promise<Charges>;
  findById(id: string): Promise<Charges | null>;
  listMany(): Promise<Charges[]>;
}
