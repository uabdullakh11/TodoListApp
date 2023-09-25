const express = require("express");
const jsonParser = express.json();
const todoController = require("../controllers/todoController.js");
const todoRouter = express.Router();

todoRouter.get("/:id", todoController.getTodos);
todoRouter.post("/", jsonParser, todoController.addTodo);
todoRouter.delete("/:id", todoController.deleteTodo);
todoRouter.put("/", jsonParser, todoController.updateTodo);

module.exports = todoRouter;