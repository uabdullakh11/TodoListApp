import { TodoService } from "../../services/index.js";

const updateTodo = async (req, res, next) => {
  // if (!req.body) return res.status(400).send("No data sent!");
  const userId = req.userId;
  const [id, title, completed, date] = [
    req.body.id,
    req.body.title,
    req.body.completed,
    req.body.date,
  ];
  try {
    const result = await TodoService.updateTodo(
      id,
      userId,
      title,
      completed,
      date,
      req.query.update
    );
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {updateTodo}