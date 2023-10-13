import pkg from "http-errors";
const { BadRequest } = pkg;
import Todo from "../../models/Todo.js";

const addTodo = async (title, completed, date, id) => {
  const taskToCheck = await Todo.findOne({ where: { title, userId: id } });
  if (taskToCheck) throw new BadRequest("Task already exist!");
  try {
    const newTodo = await Todo.create({
      title: title,
      date: date,
      userId: id,
      completed: completed,
    });
    return newTodo;
  } catch (error) {
    throw new BadRequest(error);
  }
};
export {addTodo}