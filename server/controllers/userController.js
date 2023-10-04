import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { hashPassword, comparePasswords } from "../utils/auth.js";
import { Op } from "sequelize";
import pkg from "http-errors";
import { UserService } from "../services/index.js";
const { BadRequest } = pkg;

const deleteUser = async (req, res) => {
  const id = req.userId;
  const result = await UserService.deleteUser(id);
  res.json(result);
};

const createUserAvatar = async (req, res) => {
  const id = req.userId;
  const filename = req.file.filename;
  const avatar = `/static/avatars/${filename}`;
  const result = await UserService.createUserAvatar(id, avatar);
  res.json(result);
};

const changeUserPassword = async (req, res) => {
  const id = req.userId;
  const [currentPassword, newPassword] = [
    req.body.currentPassword,
    req.body.newPassword,
  ];
  const result = await UserService.changeUserPassword(
    id,
    currentPassword,
    newPassword
  );
  res.json(result);
};

const changeUserInfo = async (req, res) => {
  if (!req.body) throw new BadRequest("No data sent!");
  const id = req.userId;
  const result = await UserService.changeUserInfo(
    id,
    req.body.newLogin,
    req.body.newEmail,
    req.query.change
  );
  res.json(result)
};

const getUserById = async (req, res) => {
  const id = req.userId;
  const result = await UserService.getUserById(id)
  res.json(result)
};

const getUserStatistic = async (req, res) => {
  const id = req.userId;
  const result = await UserService.getUserStatistic(id)
  res.json(result)
};

export {
  deleteUser,
  getUserById,
  getUserStatistic,
  createUserAvatar,
  changeUserPassword,
  changeUserInfo,
};
