import { Router } from 'express';

import { orders_message } from './orders_message';

const Orders_MessageRoute = Router();

Orders_MessageRoute.use('/orders', orders_message);

export { Orders_MessageRoute };
