import * as Joi from "joi";

export const TaskCreateSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.string().required(),
}).options({
  abortEarly: true,
  allowUnknown: true,
});
