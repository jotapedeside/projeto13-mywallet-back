import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';
import transactionRouter from './routes/transaction.router.js';
import homeRouter from './routes/home.router.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(transactionRouter);
app.use(homeRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Magic happens at ${PORT}`));