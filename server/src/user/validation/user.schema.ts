import * as Joi from 'joi'

export const UserSchema = Joi.object({
  login: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(22).required(),
}).options({
  abortEarly: true,
});
