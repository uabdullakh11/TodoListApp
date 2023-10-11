import express from "express";
import { TodoController } from "../../controllers/index.js";
import { authCheck } from "../../middleware/authCheck.js";

const searchTask = express.Router();

searchTask.get("/search", authCheck, TodoController.searchTask);

// export { searchTask };

export default searchTask;
