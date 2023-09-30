import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { hashPassword, comparePasswords } from "../utils/auth.js";

const createUser = async (login, email, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const newUser = await User.create({
      login,
      email,
      password: hashedPassword,
    });
    return newUser;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  const id = req.userId;
  try {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    res.send(`Deleted user with id: ${id}`);
  } catch (err) {
    console.log(err);
  }
};

const createUserAvatar = async (req, res) => {
  const id = req.userId;
  if (!req.body) return res.sendStatus(400);
  // const [user]
};

const changeUserPassword = async (req, res) => {
  const id = req.userId;
  const [currentPassword, newPassword] = [
    req.body.currentPassword,
    req.body.newPassword,
  ];
  const user = await User.findOne({ where: { id } });
  const isPasswordCorrect = await comparePasswords(
    currentPassword,
    user.password
  );
  if (!isPasswordCorrect) return res.sendStatus(400).send("Incorrect current password!");
  user.password = hashPassword(newPassword);
  user.save();
  return res.send("Password changed successfully!");
};

const changeUserLogin = async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ where: { id } });
  const isPasswordCorrect = await comparePasswords(
    currentPassword,
    user.password
  );
  if (!isPasswordCorrect) return res.sendStatus(400).send("Incorrect current password!");
  user.login = hashPassword(newPassword);
  user.save();
  return res.send("Password changed successfully!");
};

const createUserEmail = async (req, res) => {};

const getUserById = async (req, res) => {
  const id = req.userId;
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
    res.send(userInfo);
  } catch (err) {
    console.log(err);
  }
};

export {
  createUser,
  deleteUser,
  getUserById,
  createUserAvatar,
  changeUserPassword,
  changeUserLogin,
  createUserEmail,
};
