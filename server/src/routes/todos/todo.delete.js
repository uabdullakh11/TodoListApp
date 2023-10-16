import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";

const deleteTodo = express.Router();

deleteTodo
  .delete("/:id", authCheck, TodoController.deleteTodo)

// export {deleteTodo}

export default deleteTodo;