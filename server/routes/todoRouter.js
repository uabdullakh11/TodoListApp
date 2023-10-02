import express from "express";
import { todoController } from "../controllers/index.js";
import { authCheck } from "../helpers/authCheck.js";

const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter
  .get("/", authCheck, todoController.getTodos)
  .get("/today", authCheck, todoController.getTodayTodos)
  .get("/new",authCheck, todoController.getNewTodos)
  .get("/past",authCheck, todoController.getPastTodos)
  .get("/done",authCheck, todoController.getDoneTodos)
  .get("/undone", authCheck, todoController.getUndoneTodos)
  .post("/", jsonParser,authCheck, todoController.addTodo)
  .delete("/:id",authCheck, todoController.deleteTodo)
  .put("/", jsonParser,authCheck, todoController.updateTodo);

export { todoRouter };
