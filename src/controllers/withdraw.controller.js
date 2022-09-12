import dayjs from 'dayjs';
import { db } from '../mongo.js';

const postWithdraw = async (req, res, next) => {
  const { user } = res.locals;
  let { amount } = res.locals;

  amount = {
    ...amount,
    date: Date.now(),
    day: dayjs().format('DD/MM'),
    userId: user.userId
  }
  try {
    await db.collection('funds').insertOne(amount);
    const sendAmount = await db.collection('funds').findOne(amount);
    res.status(200).send(sendAmount);
  } catch (error) {
    res.status(500);
  }
}

export { postWithdraw };