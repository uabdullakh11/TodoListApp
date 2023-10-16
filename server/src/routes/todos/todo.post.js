import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";
import { AddTaskValidate } from "../../middleware/validation.js";
import { validateRequestResult } from "../../middleware/validationResult.js";

const addTodo = express.Router();

addTodo.post(
  "/",
  AddTaskValidate,
  validateRequestResult,
  authCheck,
  TodoController.addTodo
);

// export { addTodo };
export default addTodo;
