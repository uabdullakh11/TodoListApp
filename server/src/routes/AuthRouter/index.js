// export {login} from "./login.js";
// export { register } from "./register.js";
// export { refresh } from "./refresh.js";

import { Router } from "express";
import login from './login.js'
import register from './register.js'
import refresh from './refresh.js'

const AuthRouter = Router();

AuthRouter.use(login, register, refresh );

export default AuthRouter;


