import User from "../models/User.js";
import { Op } from "sequelize";
import { comparePasswords, generateAccessToken } from "../utils/auth.js";
import { userController } from "./index.js";

const login = async (req, res) => {
  if (!req.body) return res.send("No data send!");

  const [login, password] = [req.body.login, req.body.password];
  const user = await User.findOne({ where: {login} });
  // const user = await User.findOne({
  //   [Op.or]: [{ login: login }, { email: login }],
  // });
  if (!user) return res.send("Can't find user!");
  if (!(await comparePasswords(password, user.password))) {
    res.send("Invalid login or password!");
  }
  res.send(generateAccessToken(user.id));
};

const register = async (req, res) => {
  if (!req.body) return res.send("No data send!");
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  let user = await User.findOne({ where: { email } });
  if (user) res.send("User already exist!");
  user = await userController.createUser(login, email, password);
  res.send(user);
  return user;
};

export { login, register };
