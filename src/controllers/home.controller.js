import { db } from "../mongo.js";

const getHome = async (req, res) => {
  const {userId} = res.locals.user;
  let test = {userId}

  try {
    const data = await db.collection('funds').find({userId: userId}).toArray();
    res.status(200).json({ status: 200, message: data });
  } catch (error) {
    res.status(500);
  }
}

export { getHome };