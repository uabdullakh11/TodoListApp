import pkg from "http-errors";
import { UserService } from "../services/index.js";
const { BadRequest } = pkg;

const deleteUser = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.deleteUser(id);
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

const createUserAvatar = async (req, res, next) => {
  const id = req.userId;
  const filename = req.file.filename;
  const avatar = `/static/avatars/${filename}`;
  try {
    const result = await UserService.createUserAvatar(id, avatar);
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

const changeUserPassword = async (req, res, next) => {
  const id = req.userId;
  const [currentPassword, newPassword] = [
    req.body.currentPassword,
    req.body.newPassword,
  ];
  try {
    const result = await UserService.changeUserPassword(
      id,
      currentPassword,
      newPassword
    );
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

const changeUserInfo = async (req, res, next) => {
  if (!req.body) throw new BadRequest("No data sent!");
  const id = req.userId;
  try {
    const result = await UserService.changeUserInfo(
      id,
      req.body.newLogin,
      req.body.newEmail,
      req.query.change
    );
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

const getUserById = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.getUserById(id);
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

const getUserStatistic = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.getUserStatistic(id);
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

export {
  deleteUser,
  getUserById,
  getUserStatistic,
  createUserAvatar,
  changeUserPassword,
  changeUserInfo,
};
