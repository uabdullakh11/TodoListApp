import * as Joi from 'joi'

export const ChangeDataSchema = Joi.object({
  login: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
}).options({
  abortEarly: true,
});
