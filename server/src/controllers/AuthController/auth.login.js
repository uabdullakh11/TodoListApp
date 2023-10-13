import { AuthService } from "../../services/index.js";
const login = async (req, res, next) => {
  const [login, password] = [req.body.login, req.body.password];
  try {
    const result = await AuthService.login(login, password);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export { login };
