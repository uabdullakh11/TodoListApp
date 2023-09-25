import express from "express";
// import {getTodos, getTodayTodos, getNewTodos, getPastTodos, getDoneTodos, getUndoneTodos, addTodo, deleteTodo, updateTodo} from "../controllers/todoController.js";
import { todoController } from "../controllers/index.js";
const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter
  .get("/:id", todoController.getTodos)
  .get("/:id/today", todoController.getTodayTodos)
  .get("/:id/new", todoController.getNewTodos)
  .get("/:id/past", todoController.getPastTodos)
  .get("/:id/done", todoController.getDoneTodos)
  .get("/:id/undone", todoController.getUndoneTodos)
  .post("/", jsonParser, todoController.addTodo)
  .delete("/:id", todoController.deleteTodo)
  .put("/", jsonParser, todoController.updateTodo);

// module.exports = todoRouter;

export { todoRouter };
