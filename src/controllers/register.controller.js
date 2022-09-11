import bcrypt from 'bcryptjs';

import { db } from '../mongo.js';

const registerUser = async (req, res) => {
  const {user, email, password} = res.locals;


  try {
    const hash = bcrypt.hashSync(password, 10);

    const emailAlreadyUsed = await db.collection('users').findOne({email});

    if (emailAlreadyUsed){
      return res.status(409).json({ status: 409, message: "Email já utilizado" });
      //mongoClient.close();
    }

    await db.collection('users').insertOne({
      ...user, password: hash
    });
    /*const newUser = {
      ...user,
      password: hash
    }
    await db.collection('users').insertOne(newUser);*/
    res.status(201).json({ status: 201, message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500);
  }
}

export { registerUser };