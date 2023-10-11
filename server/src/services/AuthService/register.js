import Token from "../../models/Token.js";
import { UserService } from "../index.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const register = async (login, email, password) => {
  try {
    const user = await UserService.createUser(login, email, password);

    const REFRESH_TOKEN = generateRefreshToken(user.id);
    await Token.create({ userId: user.id, token: REFRESH_TOKEN });

    return {
      ACCESS_TOKEN: generateAccessToken(user.id),
      expires_in: Math.floor(new Date().getTime() / 1000),
      REFRESH_TOKEN,
    };
  } catch (error) {
    throw new BadRequest(error);
  }
};

export { register };
