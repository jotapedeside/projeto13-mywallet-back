import { Router } from 'express';

import { postDeposit } from '../controllers/deposit.controller.js';
import { postWithdraw } from '../controllers/withdraw.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';
import { validateTransaction } from '../middlewares/transaction.middleware.js';

const transactionRouter = Router();
transactionRouter.post('/deposit', validateToken, validateTransaction, postDeposit);
transactionRouter.post('/withdraw', validateToken, validateTransaction, postWithdraw);

export default transactionRouter;