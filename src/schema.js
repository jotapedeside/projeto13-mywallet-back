import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(8).max(30)
});

const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(8).max(30)
});

const valueSchema = joi.object({
  value: joi.number().precision(2).min(1).max(1000000000).required(),
  description: joi.string().required().trim(),
  type: joi.string().required().valid('deposit', 'withdraw')
});

export { userSchema, loginSchema, valueSchema };