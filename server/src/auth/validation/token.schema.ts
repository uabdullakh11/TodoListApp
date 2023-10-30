import * as Joi from "joi";

export const TokenSchema = Joi.object({
  token: Joi.string().required(),
}).options({
  abortEarly: false,
});
