import express from "express";
import { todoController } from "../controllers/index.js";
const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter
  .get("/", todoController.getTodos)
  .get("/today", todoController.getTodayTodos)
  .get("/new", todoController.getNewTodos)
  .get("/past", todoController.getPastTodos)
  .get("/done", todoController.getDoneTodos)
  .get("/undone", todoController.getUndoneTodos)
  .post("/", jsonParser, todoController.addTodo)
  .delete("/:id", todoController.deleteTodo)
  .put("/", jsonParser, todoController.updateTodo);

// module.exports = todoRouter;

export { todoRouter };
