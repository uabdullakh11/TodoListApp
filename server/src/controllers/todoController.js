import { TodoService } from "../services/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const getTodos = async (req, res, next) => {
  const id = req.userId;
  try {
    const todos = await TodoService.getTodos(
      id,
      req.query.page,
      req.query.filter
    );
    res.json(todos);
  } catch (error) {
    next(error)
  }
};
const searchTask = async (req, res, next) => {
  const id = req.userId;
  try {
    const todos = await TodoService.searchTask(
      id,
      req.query.title
    );
    res.json(todos);
  } catch (error) {
    next(error)
  }
}
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
    next(error)
  }
};
const deleteTodo = async (req, res, next) => {
  if (!req.params.id) throw new BadRequest("No id sent!");
  const userId = req.userId;
  const id = req.params.id;
  try {
    const result = await TodoService.deleteTodo(id, userId);
    res.json(result);
  } catch (error) {
    next(error)
  }
};
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
    next(error.message)
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo, searchTask };
