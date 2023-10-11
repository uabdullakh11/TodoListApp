import User from "../../models/User.js";
import Todo from "../../models/Todo.js";

const getUserById = async (id) => {
  try {
    const userInfo = await User.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: Todo,
          as: "todo",
        },
      ],
    });
    return userInfo;
  } catch (error) {
    throw new Error(error);
  }
};

export { getUserById };
