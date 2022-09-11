import { Router } from 'express';
import { registerUser } from '../controllers/register.controller.js';
import { validateRegistration } from '../middlewares/register.middleware.js';

const authRouter = Router();

authRouter.post('/register', validateRegistration, registerUser);

export default authRouter;