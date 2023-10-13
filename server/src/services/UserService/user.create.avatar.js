import pkg from "http-errors";
const { BadRequest } = pkg;
import User from "../../models/User.js";

const createUserAvatar = async (id, avatar) => {
  try {
    const avatarToCheck = await User.findOne({ where: { avatar: avatar } });
    if (avatarToCheck) throw new BadRequest(`Avatar already exist!`);
    const user = await User.findByPk(id)
    user.avatar = avatar;
    user.save();
    return user.avatar;
  } catch (error) {
    throw new BadRequest(error);
  }
};

export { createUserAvatar };
