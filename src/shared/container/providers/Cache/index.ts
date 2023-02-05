import { container } from 'tsyringe';

import RedisCacheProvider from './implementations/RedisCachProvider';
import ICacheProvider from './model/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('Cache', providers.redis);
