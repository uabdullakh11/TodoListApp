import User from "../models/User.js";
import { comparePasswords, generateAccessToken } from "../utils/auth.js";
import { userController } from "./index.js";

const login = async (req, res) => {
  console.log(req.body);
  if (!req.body) return res.sendStatus(400);
  const [login, password] = [req.body.login, req.body.password];
  const user = await User.findOne({ where: {login} });
  if (!(await comparePasswords(password, user.password))) {
    console.log("Invalid login or password");
    res.send("Invalid login or password");
  }
  res.send(generateAccessToken(user.id))
  // return {
  //   access: generateAccessToken(user.id),
  // };
}

const register = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  let user = await User.findOne({ where: { email } });
  if (user) console.log("User already exist");
  user = await userController.createUser(login, email, password);
  res.send(user)
  return user;
}

export { login, register };
