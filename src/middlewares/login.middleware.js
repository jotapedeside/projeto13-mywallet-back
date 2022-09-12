import bcrypt from 'bcryptjs';
import { db } from '../mongo.js';
import { loginSchema } from '../schema.js';
import sanitize from '../sanitize.js';

const validateLogin = async (req, res, next) => {
  const loginValidation = loginSchema.validate(req.body, {abortEarly: false});

  try {
    if (loginValidation.error) {
      const erros = loginValidation.error.details.map((error) => error.message);
      return res.status(422).json({ status: 422, message: erros });
    }

    const userLogin = {
      email: sanitize(req.body.email),
      password: sanitize(req.body.password)
    }

    const {email, password} = userLogin;

    const user = await db.collection('users').findOne({email});
    if (!user || !bcrypt.compareSync(password, user.password)){
      return res.status(401).json({ status: 401, message: "Email ou senha incorretos" });
    }

    res.locals.userLogin = userLogin;
    res.locals._id = user._id;
    res.locals.user = user.name;
    res.locals.email = user.email;
    res.locals.password = user.password;
    next();
    
  } catch (error) {
    res.status(500);
  }  
}

export { validateLogin };