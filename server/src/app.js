import express from "express";
import rootRouter from "./routes/index.js";
import recursiveReadSync from "recursive-readdir-sync";
import cors from "cors";
import { sequelize } from "./models/index.js";
import { config } from "./config/index.js";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandlers.js";
import path from "path";

const app = express();

const port = config.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(morgan("tiny"));

app.use("/static/avatars", express.static("./src/static/avatars"));

// app.use("/", rootRouter);

let files;

try {
  files = recursiveReadSync("./src/routes");
} catch (err) {
  if (err.errno === 34) {
    console.log("Path does not exist");
  } else {
    throw err;
  }
}

files.forEach(async (item) => {
  // console.log("./"+item.split(path.sep).splice(1,).join('/'))
  app.use(
    "/",
    errorHandler,
    await import("./" + item.split(path.sep).splice(1).join("/")).then(
      (res) => res.default
    )
  );
});

app.use(errorHandler);

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Database module initialized");
  } catch (error) {
    console.log(error);
  }
}

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on localhost:${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
