import pkg from "http-errors";
const { BadRequest } = pkg;
import { AuthService } from "../services/index.js";

const login = async (req, res) => {
  // if (!req.body) throw new BadRequest("No data send!");
  const [login, password] = [req.body.login, req.body.password];
  try {
    const result = await AuthService.login(login, password);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const register = async (req, res) => {
  // if (!req.body) throw new BadRequest("No data send!");
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  try {
    const result = await AuthService.register(login, email, password);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const refreshToken = async (req, res) => {
  // if (!req.body.refreshToken) throw new BadRequest("No refresh token");
  try {
    const result = await AuthService.refreshToken(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { login, register, refreshToken };
