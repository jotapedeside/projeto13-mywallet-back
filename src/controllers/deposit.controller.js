import dayjs from 'dayjs';
import { db } from '../mongo.js';

const postDeposit = async (req, res, next) => {
  const { user } = res.locals;
  let { transaction } = res.locals;

  transaction = {
    ...transaction,
    date: Date.now(),
    day: dayjs().format('DD/MM'),
    userId: user.userId
  }
  try {
    await db.collection('funds').insertOne(transaction);
    const sendAmount = await db.collection('funds').findOne(transaction);
    res.status(200).send(sendAmount);
  } catch (error) {
    res.status(500);
  }
}

export { postDeposit };