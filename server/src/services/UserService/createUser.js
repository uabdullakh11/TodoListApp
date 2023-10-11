import User from "../../models/User.js";
import { hashPassword} from "../../utils/auth.js";

const createUser = async (login, email, password) => {
    const hashedPassword = hashPassword(password);
    try {
      const newUser = await User.create({
        login,
        email,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };

export {createUser}