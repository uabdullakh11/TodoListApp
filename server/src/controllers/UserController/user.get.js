import { UserService } from "../../services/index.js";

const getUserById = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.getUserById(id);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export { getUserById };
