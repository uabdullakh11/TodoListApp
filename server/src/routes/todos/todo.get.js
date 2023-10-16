import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";

const getTodos = express.Router();

getTodos.get("/", authCheck, TodoController.getTodos);

// export { getTodos };

export default getTodos;