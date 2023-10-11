import { UserService } from "../../services/index.js";

const createUserAvatar = async (req, res, next) => {
  const id = req.userId;
  const filename = req.file.filename;
  const avatar = `/static/avatars/${filename}`;
  try {
    const result = await UserService.createUserAvatar(id, avatar);
    res.json(result);
  } catch (error) {
    next(error.message);
  }
};

export { createUserAvatar };
