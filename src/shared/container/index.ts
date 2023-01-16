import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import RedisCacheProvider from './providers/implementations/RedisCachProvider';
import ICacheProvider from './providers/model/ICacheProvider';

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

const prividers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('Cache', prividers.redis);

container.registerSingleton<IUsersRepository>('PrismaUser', UsersRespository);

container.registerSingleton<IStorageProvider>('Storage', S3Storage);
