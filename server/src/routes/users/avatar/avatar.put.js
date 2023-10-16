import express from "express";
import { UserController } from "../../../controllers/index.js";
import { authCheck } from "../../../middleware/authCheck.js";
import { imgUploader } from "../../../middleware/multer.js";

const createUserAvatar = express.Router();

createUserAvatar.put(
  "/",
  authCheck,
  imgUploader,
  UserController.createUserAvatar
);

// export { createUserAvatar };

export default createUserAvatar;
