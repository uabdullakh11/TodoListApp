import { Router } from "express";

import AuthRouter from "./AuthRouter/index.js";
import UserRouter from "./UserRouter/index.js";
import TodoRouter   from "./TodoRouter/index.js";

const rootRouter = Router();

rootRouter.use("/api/users", UserRouter);
rootRouter.use("/api/todos", TodoRouter);
rootRouter.use("/api/auth", AuthRouter);


// import recursiveReadSync from "recursive-readdir-sync";
// let files;

// try {
//   files = recursiveReadSync('./src/routes');
// } catch(err){
//   if(err.errno === 34){
//     console.log('Path does not exist');
//   } else {
//     throw err;
//   }
// }

// console.log(files[0])


export default rootRouter;
