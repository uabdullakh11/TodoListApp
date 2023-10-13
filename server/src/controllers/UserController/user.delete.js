import { UserService } from "../../services/index.js";

const deleteUser = async (req, res, next) => {
  const id = req.userId;
  try {
    const result = await UserService.deleteUser(id);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export { deleteUser };
