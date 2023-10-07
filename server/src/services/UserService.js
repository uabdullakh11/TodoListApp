import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { hashPassword, comparePasswords } from "../utils/auth.js";
import { Op } from "sequelize";
import pkg from "http-errors";
const { BadRequest } = pkg;

const createUser = async (login, email, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const newUser = await User.create({
      login,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

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

const createUserAvatar = async (id, avatar) => {
  try {
    const avatarToCheck = await User.findOne({ where: { avatar: avatar } });
    if (avatarToCheck) throw new BadRequest(`Avatar already exist!`);
    // const user = await User.findOne({ where: { id } });
    const user = await User.findByPk(id)
    user.avatar = avatar;
    user.save();
    return user.avatar;
  } catch (error) {
    throw new BadRequest(error);
  }
};

const changeUserPassword = async (id, currentPassword, newPassword) => {
  try {
    // const user = await User.findOne({ where: { id } });
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

const changeUserInfo = async (id, newLogin, newEmail, type) => {
  try {
    if (type == "username") {
      // const findUsers = await User.findOne({
      //   where: { login: newLogin },
      // });
      // if (findUsers) throw new BadRequest("This login is already exist!");
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
      // const findUsers = await User.findOne({
      //   where: { email: newEmail },
      // });
      // if (findUsers) throw new BadRequest("This email is already exist!");
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

const getUserStatistic = async (id) => {
  try {
    const countAll = await Todo.count({
      where: {
        userId: id,
      },
    });
    const countDone = await Todo.count({
      where: {
        userId: id,
        completed: true,
      },
    });
    let week = new Date();
    week.setDate(week.getDate() - 7);
    const countWeekAll = await Todo.count({
      where: {
        userId: id,
        createdAt: { [Op.between]: [week, new Date()] },
      },
    });
    const countWeekDone = await Todo.count({
      where: {
        userId: id,
        completed: true,
        createdAt: { [Op.between]: [week, new Date()] },
      },
    });
    const AllTimePercant = Math.floor((countDone / countAll) * 100);
    const WeekPercant = Math.floor((countWeekDone / countWeekAll) * 100);
    return { AllTimePercant, WeekPercant };
  } catch (error) {
    throw new Error(error);
  }
};

export {
  createUser,
  deleteUser,
  getUserById,
  getUserStatistic,
  createUserAvatar,
  changeUserPassword,
  changeUserInfo,
};
