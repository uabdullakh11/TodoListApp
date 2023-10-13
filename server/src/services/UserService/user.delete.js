import { Op } from "sequelize";
import User from "../../models/User.js";

const deleteUser = async (id) => {
  try {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return `Deleted user with id: ${id}`;
  } catch (error) {
    throw new Error(error);
  }
};

export { deleteUser };
