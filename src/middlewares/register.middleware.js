import { userSchema } from '../schema.js';
import sanitize from '../sanitize.js';

const validateRegistration = async (req, res, next) => {
  const userValidation = userSchema.validate(req.body, {abortEarly: false});

  try {
    if (userValidation.error) {
      const erros = userValidation.error.details.map((error) => error.message);
      return res.status(422).json({ status: 422, message: erros });
    }

    /*const emailAlreadyUsed = await db.collection('users').findOne({email: req.body.email});
     
    if (emailAlreadyUsed){
      res.status(409).json({ status: 409, message: "Email já utilizado" });
      //mongoClient.close();
    }*/

    const user = {
      name: sanitize(req.body.name),
      email: sanitize(req.body.email),
      password: sanitize(req.body.password)
    }

    res.locals.user = user;
    res.locals.email = user.email;
    res.locals.password = user.password;
    next();
    
  } catch (error) {
    res.status(500);
  }
}

export { validateRegistration };