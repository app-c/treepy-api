import upload from '@config/upload';
import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../controllers/UserController';

const user = Router();
const control = new UserController();

const img = multer(upload);

user.post('/create-user', control.create);
user.post('/session', control.session);
user.get('/find-user/', Auth, control.findUser);

user.post('/send-forgot-password', control.sendForgotPassword);

// user.use(Auth);

export { user };
