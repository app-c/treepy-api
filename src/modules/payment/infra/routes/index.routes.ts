import { Router } from 'express';

import { pay } from './payment.routes';

const Payment = Router();

Payment.use('/pay-pag', pay);

export { Payment };
