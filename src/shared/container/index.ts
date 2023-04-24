/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';

import './providers';
import '@modules/users/providers';
import { IChargesRepository } from '@modules/Charges/repositories/IRepository/IChargesRepository';
import { ChargesPrismaRepository } from '@modules/Charges/repositories/models/ChargesPrismaRepository';
import { IEndRepository } from '@modules/End/repositories/IRepository/IEndRepository';
import { EndPrismaRepository } from '@modules/End/repositories/models/EndPrismaRepository';
import { IOrders_MessageRepository } from '@modules/Orders_Message/repositories/IRepository/IOrders_MessageRepository';
import { Orders_MessagePrismaRepository } from '@modules/Orders_Message/repositories/models/Orders_MessagePrismaRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import UserTokenRepository from '@modules/users/repositories/UserTokenRepositorie';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import RedisCacheProvider from './providers/Cache/implementations/RedisCachProvider';
import ICacheProvider from './providers/Cache/model/ICacheProvider';
// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

const prividers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('Cache', prividers.redis);

container.registerSingleton<IUsersRepository>(
  process.env.USER!,
  UsersRespository,
);

container.registerSingleton<IUserTokenRepository>('token', UserTokenRepository);

container.registerSingleton<IStorageProvider>('User', S3Storage);

container.registerSingleton<IEndRepository>('End', EndPrismaRepository);

container.registerSingleton<IOrders_MessageRepository>(
  'OrderMessage',
  Orders_MessagePrismaRepository,
);

container.registerSingleton<IChargesRepository>(
  'Charge',
  ChargesPrismaRepository,
);
