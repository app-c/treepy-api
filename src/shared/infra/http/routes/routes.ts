import { EndRoute } from '@modules/End/http/routes';
import { Payment } from '@modules/payment/infra/routes/index.routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(UserRoute);
routes.use(Payment);
routes.use(EndRoute);

export { routes };
