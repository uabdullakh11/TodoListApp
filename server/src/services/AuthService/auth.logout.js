import Token from "../../models/Token.js";
import { verifyToken } from "../../utils/auth.js";
import { config } from "../../config/index.js";
import pkg from "http-errors";
const { BadRequest } = pkg;

const logout = async (refreshToken) => {
  try {
    const token = await Token.findOne({
      where: { token: refreshToken },
    });
    if (!token) throw new BadRequest("Invalid refresh token");
    const user = verifyToken(refreshToken, config.JWT_REFRESH_SECRET_KEY);
    if (!user) throw new BadRequest("Invalid refresh token");
    //удалить токен в базе 
    await token.destroy();
    return "Logout succesfully!"
  } catch (error) {
    throw new BadRequest(error);
  }
};

export { logout };
