import { ChargesRoute } from '@modules/Charges/http/routes';
import { EndRoute } from '@modules/End/http/routes';
import { Orders_MessageRoute } from '@modules/Orders_Message/http/routes';
import { Payment } from '@modules/payment/infra/routes/index.routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(Orders_MessageRoute);
routes.use(UserRoute);
routes.use(Payment);
routes.use(EndRoute);
routes.use(ChargesRoute);

export { routes };
