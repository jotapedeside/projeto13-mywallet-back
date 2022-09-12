import { Router } from 'express';
import { registerUser } from '../controllers/register.controller.js';
import { validateRegistration } from '../middlewares/register.middleware.js';
import { postLoginUser } from '../controllers/login.controller.js';
import { validateLogin } from '../middlewares/login.middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegistration, registerUser);
authRouter.post('/login', validateLogin, postLoginUser);

export default authRouter;