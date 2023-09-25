import express from "express";
import {getTodos, getTodayTodos, getNewTodos, getPastTodos, getDoneTodos, getUndoneTodos, addTodo, deleteTodo, updateTodo} from "../controllers/todoController.js";
const jsonParser = express.json();
const todoRouter = express.Router();

todoRouter.get("/:id", getTodos);
todoRouter.get("/:id/today", getTodayTodos);
todoRouter.get("/:id/new", getNewTodos);
todoRouter.get("/:id/past", getPastTodos);
todoRouter.get("/:id/done", getDoneTodos);
todoRouter.get("/:id/undone", getUndoneTodos);
todoRouter.post("/", jsonParser, addTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.put("/", jsonParser, updateTodo);

// module.exports = todoRouter;

export {todoRouter};