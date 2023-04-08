import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { end } from './end';

const EndRoute = Router();

EndRoute.use(Auth);

EndRoute.use('/end', end);

export { EndRoute };
