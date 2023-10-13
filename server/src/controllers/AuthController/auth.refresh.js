import { AuthService } from "../../services/index.js";

const refreshToken = async (req, res, next) => {
  try {
    const result = await AuthService.refreshToken(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export {refreshToken}