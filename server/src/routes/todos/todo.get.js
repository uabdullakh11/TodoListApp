import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";
import { validateRequestResult } from "../../middleware/validationResult.js";
import { getTasksValidate } from "../../middleware/validation.js";

const getTodos = express.Router();

getTodos.get(
  "/",
  getTasksValidate,
  validateRequestResult,
  authCheck,
  TodoController.getTodos
);

export default getTodos;
