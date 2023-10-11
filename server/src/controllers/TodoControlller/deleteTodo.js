import { TodoService } from "../../services/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const deleteTodo = async (req, res, next) => {
  if (!req.params.id) throw new BadRequest("No id sent!");
  const userId = req.userId;
  const id = req.params.id;
  try {
    const result = await TodoService.deleteTodo(id, userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {deleteTodo}