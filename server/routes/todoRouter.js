import express from "express";
import { todoController } from "../controllers/index.js";
import { authCheck } from "../middleware/authCheck.js";
import { AddTaskValidate, UpdateTaskValidate } from "../middleware/validation.js";
import { validateRequestResult } from "../middleware/validationResult.js";

const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter
  .get("/", authCheck, todoController.getTodos)
  // .get("/today", authCheck, todoController.getTodayTodos)
  // .get("/new",authCheck, todoController.getNewTodos)
  // .get("/past",authCheck, todoController.getPastTodos)
  // .get("/done",authCheck, todoController.getDoneTodos)
  // .get("/undone", authCheck, todoController.getUndoneTodos)
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
