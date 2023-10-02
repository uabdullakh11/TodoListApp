import { config } from "../config/index.js";
import { verifyToken } from "../utils/auth.js";
export function authCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).send("No token send!");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(500).send("Invalid token!");
  const authUser = verifyToken(token, config.JWT_SECRET_KEY);
  req.userId = authUser.id;
  next();
}
