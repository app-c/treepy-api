import { Router } from 'express';

import { webhookRoute } from './webhook-route';

const RouteWebhook = Router();

RouteWebhook.use('/hook', webhookRoute);

export { RouteWebhook };
