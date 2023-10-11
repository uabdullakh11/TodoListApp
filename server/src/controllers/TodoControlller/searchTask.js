import { TodoService } from "../../services/index.js";
const searchTask = async (req, res, next) => {
  const id = req.userId;
  try {
    const todos = await TodoService.searchTask(id, req.query.title);
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export {searchTask}