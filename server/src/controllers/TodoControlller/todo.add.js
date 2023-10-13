import { TodoService } from "../../services/index.js";

const addTodo = async (req, res, next) => {
  // if (!req.body) throw new BadRequest("No data sent!");
  const userId = req.userId;
  const [title, completed, date] = [
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    const result = await TodoService.addTodo(title, completed, date, userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export {addTodo}