import User from "../../models/User.js";
import pkg from "http-errors";
const { BadRequest } = pkg;
import { Op } from "sequelize";

const changeUserInfo = async (id, newLogin, newEmail) => {
  try {
    const userCheck = await User.findOne({
      where: {
        [Op.or]: [{ login: newLogin }, { email: newEmail }],
        id: {
          [Op.not]: id,
        },
      },
    });

    if (userCheck)
      throw new BadRequest("User with this login or email already exist!");

    const user = await User.findByPk(id);
    user.login = newLogin;
    user.email = newEmail;
    user.save();

    return { login: user.login, email: user.email };
  } catch (error) {
    throw new BadRequest(error);
  }
};
export { changeUserInfo };
