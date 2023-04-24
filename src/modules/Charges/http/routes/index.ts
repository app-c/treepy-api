import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { charges } from './charges';

const ChargesRoute = Router();

ChargesRoute.use(Auth);

ChargesRoute.use('/charges', charges);

export { ChargesRoute };
