import User from "../../models/User.js";
import pkg from "http-errors";
const { BadRequest } = pkg;
import { Op } from "sequelize";

const changeUserInfo = async (id, newLogin, newEmail) => {
  try {
    const userCheck = await User.findOne({
      // where: {
      //   login: newLogin,
      //   email: newEmail,
      //   id: {
      //     [Op.not]: id,
      //   },
      // },
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
    // const user = await User.update(
    //   {
    //     login: newLogin,
    //     email: newEmail,
    //   },
    //   {
    //     where: {
    //       id: {
    //         [Op.eq]: id,
    //       },
    //     },
    //   }
    // );

    return { login: user.login, email: user.email };
  } catch (error) {
    throw new BadRequest(error);
  }
};
export { changeUserInfo };
