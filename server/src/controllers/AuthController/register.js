import { AuthService } from "../../services/index.js";

const register = async (req, res, next) => {
  const [login, email, password] = [
    req.body.login,
    req.body.email,
    req.body.password,
  ];
  try {
    const result = await AuthService.register(login, email, password);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {register}