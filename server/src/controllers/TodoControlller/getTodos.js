import { TodoService } from "../../services/index.js";
const getTodos = async (req, res, next) => {
  const id = req.userId;
  try {
    const todos = await TodoService.getTodos(
      id,
      req.query.page,
      req.query.filter,
      req.query.order
    );
    res.json(todos);
  } catch (error) {
    next(error);
  }
};
export {getTodos}
