import { Router } from "express";
import  addTodo from "./addTodo.js";
import deleteTodo  from "./deleteTodo.js";
import getTodos  from "./getTodos.js";
import searchTask from "./searchTask.js";
import updateTodo  from "./updateTodo.js";

const TodoRouter = Router();

TodoRouter.use( addTodo, deleteTodo, getTodos, searchTask, updateTodo);

export default TodoRouter;