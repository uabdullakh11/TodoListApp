import { config } from "../config/index.js";
import { verifyToken } from "../utils/auth.js";
export function authCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(400);
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  req.userId = authUser.id;
  next();
}
