import User from "../models/User.js";
import { Op } from "sequelize";
import { comparePasswords, generateAccessToken } from "../utils/auth.js";
import { userController } from "./index.js";
// import BadRequest from 'http-errors';

const login = async (req, res) => {
  if (!req.body) return res.send("No data send!");

  const [login, password] = [req.body.login, req.body.password];
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: login,
          },
          {
            login: login,
          },
        ],
      },
    });
    if (!user) return res.status(500).send("User not found!");
    if (!(await comparePasswords(password, user.password))) {
      return res.status(400).send("Invalid login or password!");
    }
    return res.send(generateAccessToken(user.id));
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  if (!req.body) return res.send("No data send!");
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  // let user = await User.findOne({ where: { email } });
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: email,
          },
          {
            login: login,
          },
        ],
      },
    });
    if (user) return res.status(404).send("User already exist!");
    user = await userController.createUser(login, email, password);
    return res.send(generateAccessToken(user.id));
  } catch (err) {
    console.log(err);
  }
};

export { login, register };
