import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';

dotenv.config();
const app = express();
app.use(cors());
console.log("Express and cors working");
app.use(express.json());
console.log("Express.json working");

app.use(authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Magic happens at ${PORT}`));