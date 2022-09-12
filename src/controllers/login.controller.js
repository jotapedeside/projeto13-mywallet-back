import { v4 as uuid } from 'uuid';
import { db } from '../mongo.js';

const postLoginUser = async (req, res) => {
  const {userLogin, user, _id} = res.locals;

  try {
    const isUserLogged = await db.collection('sessions').findOne({userId: _id});
    const token = uuid();
    /*if (!user) {
      return res.status(404).json({ status: 404, message: "Email não cadastrado" });
    }
    if (user.password !== userLogin.password) {
      return res.status(401).json({ status: 401, message: "Senha incorreta" });
    }*/
    
    if (isUserLogged) {
      await db.collection('sessions').updateOne({userId: _id}, {$set: {token}});
      res.status(200).json({ status: 200, message: "Usuário logado com sucesso", token });
    } else {
      await db.collection('sessions').insertOne({userId: _id, name: user, token});
      res.status(200).json({ status: 200, message: "Usuário logado com sucesso", token });
    }
    
    res.send(token);

  }
  catch (error) {
    res.status(500);
  }
}

export { postLoginUser };