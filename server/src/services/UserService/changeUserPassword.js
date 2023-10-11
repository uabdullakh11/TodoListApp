import User from "../../models/User.js";
import { hashPassword, comparePasswords } from "../../utils/auth.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const changeUserPassword = async (id, currentPassword, newPassword) => {
  try {
    const user = await User.findByPk(id);
    const isPasswordCorrect = await comparePasswords(
      currentPassword,
      user.password
    );
    if (!isPasswordCorrect)
      throw new BadRequest("Incorrect current password!");
    user.password = hashPassword(newPassword);
    user.save();
    return "Password changed successfully!";
  } catch (error) {
    throw new BadRequest(error);
  }
};
export {changeUserPassword};
