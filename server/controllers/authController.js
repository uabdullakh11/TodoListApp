import { AuthService } from "../services/index.js";

const login = async (req, res, next) => {
  // if (!req.body) throw new BadRequest("No data send!");
  const [login, password] = [req.body.login, req.body.password];
  try {
    const result = await AuthService.login(login, password);
    res.json(result);
  } catch (error) {
    // console.log(error)
    // throw new BadRequest(error.message) 
    // throw BadRequest(error.message)
    next(error.message)
    // res.status(400).send(error.message);
  }
};

const register = async (req, res, next) => {
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
    next(error.message)
  }
};

const refreshToken = async (req, res, next) => {
  // if (!req.body.refreshToken) throw new BadRequest("No refresh token");
  try {
    const result = await AuthService.refreshToken(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error.message)
  }
};

export { login, register, refreshToken };
