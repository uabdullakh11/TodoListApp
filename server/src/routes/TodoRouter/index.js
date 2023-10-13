import { Router } from "express";
import  addTodo from "./todo.add.js";
import deleteTodo  from "./todo.delete.js";
import getTodos  from "./todo.get.js";
import updateTodo  from "./todo.update.js";

const TodoRouter = Router();

TodoRouter.use( addTodo, deleteTodo, getTodos, updateTodo);

export default TodoRouter;