import { AuthService } from "../../services/index.js";
const logout = async (req, res, next) => {
  try {
    const result = await AuthService.logout(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export { logout };
