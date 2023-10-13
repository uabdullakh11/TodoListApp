import User from "../../models/User.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const changeUserInfo = async (id, newLogin, newEmail, type) => {
  try {
    if (type == "username") {
      const existingUser = await User.findOne({
        where: { login: newLogin },
      });
      if (existingUser) {
        throw new BadRequest("This login already exists!");
      }
      const user = await User.findOne({ where: { id } });
      user.login = newLogin;
      user.save();
      return user.login;
    } else if (type == "email") {
      const existingUser = await User.findOne({ where: { email: newEmail } });
      if (existingUser) {
        throw new BadRequest("This email already exists!");
      }
      const user = await User.findOne({ where: { id } });
      user.email = newEmail;
      user.save();
      return user.email;
    }
  } catch (error) {
    throw new BadRequest(error);
  }
};
export {changeUserInfo}