import * as Joi from 'joi'

export const PassSchema = Joi.object({
    currentPassword: Joi.string().min(6).max(22).required(),
    newPassword: Joi.string().min(6).max(22).required(),
}).options({
  abortEarly: true,
});
