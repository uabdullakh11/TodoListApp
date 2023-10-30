import * as Joi from "joi";

export const TaskUpdateSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.string().required(),
  completed: Joi.required(),
}).options({
  abortEarly: true,
});
