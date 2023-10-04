import { config } from "../config/index.js";
import { verifyToken } from "../utils/auth.js";
import pkg from "http-errors";
const { Forbidden, BadRequest } = pkg;

export function authCheck(req, res, next) {
  const authHeader = req.headers.authorization;
  // if (!authHeader) return res.status(400).send("No token send!");
  const token = authHeader && authHeader.split(" ")[1];
  // if (!token) return res.status(500).send("Invalid token!");
  if (!token) {
    next(new BadRequest("invalid_token"), null);
    return;
  }
  // const authUser = verifyToken(token, config.JWT_SECRET_KEY, res);
  // req.userId = authUser;
  try {
    const authUser = verifyToken(token, config.JWT_SECRET_KEY, res);
    /// authUser { id: 4, type: 'ACCESS', iat: 1696360398, exp: 1696363998 }
    req.userId = authUser.id;
  } catch (error) {
    next(error, null);
    return;
  }
  next();
}
