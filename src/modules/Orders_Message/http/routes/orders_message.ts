import { Router } from 'express';

import { Orders_MessageController } from '../controller/Orders_MessageController';

const orders_message = Router();
const control = new Orders_MessageController();

orders_message.post('/webhooks', control.create);
orders_message.get('/:id/', control.findById);
orders_message.get('/', control.listMany);

export { orders_message };
