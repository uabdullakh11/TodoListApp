import Todo from "../../models/Todo.js";

const deleteTodo = async (id, userId) => {
  try {
    await Todo.destroy({
      where: {
        userId: userId,
        id: id,
      },
    });
    return `Delete task ${id} successfully of user ${userId}`;
  } catch (error) {
    throw new Error(error);
  }
};

export {deleteTodo}