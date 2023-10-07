import express from "express";
import { todoController } from "../controllers/index.js";
import { authCheck } from "../middleware/authCheck.js";
import { AddTaskValidate, UpdateTaskValidate } from "../middleware/validation.js";
import { validateRequestResult } from "../middleware/validationResult.js";

const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter
  .get("/", authCheck, todoController.getTodos)
  .get("/search", authCheck, todoController.searchTask)
  .post(
    "/",
    AddTaskValidate,
    validateRequestResult,
    authCheck,
    todoController.addTodo
  )
  .delete("/:id", authCheck, todoController.deleteTodo)
  .put(
    "/",
    UpdateTaskValidate,
    validateRequestResult,
    authCheck,
    todoController.updateTodo
  );

export { todoRouter };
