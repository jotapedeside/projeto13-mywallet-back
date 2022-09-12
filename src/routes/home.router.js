import { Router }from 'express';
import { getHome } from '../controllers/home.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';

const homeRouter = Router();

homeRouter.get('/', validateToken, getHome);

export default homeRouter;