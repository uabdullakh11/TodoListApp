import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";
import { UpdateTaskValidate } from "../../middleware/validation.js";
import { validateRequestResult } from "../../middleware/validationResult.js";

const updateTodo = express.Router();

updateTodo.put(
  "/",
  UpdateTaskValidate,
  validateRequestResult,
  authCheck,
  TodoController.updateTodo
);

// export { updateTodo };

export default updateTodo;
