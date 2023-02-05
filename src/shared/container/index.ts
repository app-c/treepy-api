/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';
import { IPaymentRepositories } from '@modules/payment/repositories/IPaymentRespository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/repositories/UserTokenRepositorie';

import RedisCacheProvider from './providers/Cache/implementations/RedisCachProvider';
// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

const prividers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<IUsersRepository>(
  process.env.USER!,
  UsersRespository,
);

container.registerSingleton<IUserTokenRepository>('token', UserTokenRepository);

container.registerSingleton<IStorageProvider>(process.env.STOREGE!, S3Storage);
