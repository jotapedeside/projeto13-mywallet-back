import { ObjectId } from "mongodb";

import { db } from "../mongo.js";

const getHome = async (req, res) => {
  const {user} = res.locals;

  try {
    const data = await db.collection('funds').find({userId: user.userId}).toArray();
    res.send([user, data])
  } catch (error) {
    res.status(500);
  }
}

export { getHome };