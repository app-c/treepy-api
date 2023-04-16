import { Router } from 'express';

import { ChargesController } from '../controller/ChargesController';

const charges = Router();
const control = new ChargesController();

charges.post('/card', control.card);
charges.post('/boleto', control.boleto);
charges.post('/pix', control.pix);
charges.get('/:id/', control.findById);
charges.get('/', control.listMany);

export { charges };
