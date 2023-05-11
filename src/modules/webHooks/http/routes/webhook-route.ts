import { Router } from 'express';

import { WebhookController } from '../controller/webhook-controller';

const webhookRoute = Router();
const control = new WebhookController();

webhookRoute.post('/', control.create);
webhookRoute.get('/:id/', control.findById);
webhookRoute.get('/', control.listMany);

export { webhookRoute };
