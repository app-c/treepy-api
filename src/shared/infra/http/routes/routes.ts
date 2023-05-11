import { ChargesRoute } from '@modules/Charges/http/routes';
import { EndRoute } from '@modules/End/http/routes';
import { Payment } from '@modules/payment/infra/routes/index.routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { RouteWebhook } from '@modules/webHooks/http/routes';
import { Router } from 'express';

const routes = Router();

routes.use(RouteWebhook);
routes.use(UserRoute);
routes.use(Payment);
routes.use(EndRoute);
routes.use(ChargesRoute);

export { routes };
