import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { hashPassword, comparePasswords } from "../utils/auth.js";
import { Op } from "sequelize";

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
  const filename = req.file.filename;
  const avatar = `/static/avatars/${filename}`;
  const avatarToCheck = await User.findOne({ where: { avatar: avatar } });
  if (avatarToCheck) return res.status(400).send(`Avatar already exist!`);
  const user = await User.findOne({ where: { id } });
  user.avatar = avatar;
  user.save();
  return res.send(user.avatar);
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
  if (!isPasswordCorrect)
    return res.status(400).send("Incorrect current password!");
  user.password = hashPassword(newPassword);
  user.save();
  return res.send("Password changed successfully!");
};

const changeUserInfo = async (req, res) => {
  if (!req.body) return res.status(400).send("No data sent!");
  const id = req.userId;
  try {
    if (req.query.change == "username") {
      const newLogin = req.body.newLogin;
      const findUsers = await User.findOne({
        where: { login: newLogin },
      });
      if (findUsers)
        return res.status(400).send("This login is already exist!");
      const user = await User.findOne({ where: { id } });
      user.login = newLogin;
      user.save();
      return res.send(user.login);
    } else if (req.query.change == "email") {
      const newEmail = req.body.newEmail;
      const findUsers = await User.findOne({
        where: { email: newEmail },
      });
      if (findUsers)
        return res.status(400).send("This email is already exist!");
      const user = await User.findOne({ where: { id } });
      user.email = newEmail;
      user.save();
      return res.send(user.email);
    }
  } catch (e) {
    console.log(e);
  }
};

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
    return res.send(userInfo);
  } catch (err) {
    console.log(err);
  }
};

const getUserStatistic = async (req, res) => {
  const id = req.userId;
  try {
    const countAll = await Todo.count({
      where: {
        userId: id,  
      },
    })
    const countDone = await Todo.count({
      where: {
        userId: id,  
        completed: true
      },
    })
    const week = await Todo.findAll({
      where: {
        userId: id,
        // date: { [Op.between]: ["10/2/2023, 17:10:11", new Date()] },
        date: { [Op.between]: [new Date()-7, new Date()] },
      },
    })
    const AllTomePercant = Math.floor((countDone/countAll)*100);
    return res.send({AllTomePercant, week})
  }
  catch(err){
    console.log(err);
  }
}

export {
  createUser,
  deleteUser,
  getUserById,
  getUserStatistic,
  createUserAvatar,
  changeUserPassword,
  changeUserInfo,
};
