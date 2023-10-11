import Token from "../../models/Token.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/auth.js";
import { config } from "../../config/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const refreshToken = async (refreshToken) => {
  try {
    const token = await Token.findOne({
      where: { token: refreshToken },
    });
    if (!token) throw new BadRequest("Invalid refresh token");
    const user = verifyToken(refreshToken, config.JWT_REFRESH_SECRET_KEY);
    if (!user) throw new BadRequest("Invalid refresh token");

    if (token.verifyExpiration(token)) {
      //если истек срок refresh обновить в базе
      const REFRESH_TOKEN = generateRefreshToken(user.id);
      await token.destroy();
      await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();
    }

    const ACCESS_TOKEN = generateAccessToken(user.id);
    //создать refsresh_token и заменить в базе
    const REFRESH_TOKEN = generateRefreshToken(user.id);
    await token.destroy();
    await new Token({ userId: user.id, token: REFRESH_TOKEN }).save();

    return {
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      expires_in: Math.floor(new Date().getTime() / 1000),
    };
  } catch (error) {
    throw new BadRequest(error);
  }
};

export { refreshToken };
