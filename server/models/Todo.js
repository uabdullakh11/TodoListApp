// import { INTEGER } from "sequelize"

// const Todo = () =>{
//     title: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//         required: true,
//     },
//     completed : {
//         type: Boolean,
//         default: false,
//         required: true,
//     }
//     userId: {
//         type: INTEGER,
//         required: true,
//     }

// }
// const Todo = model('Todo', Todo)
import { Sequelize } from "sequelize";
import { sequelize } from "./index.js";
const Todo = sequelize.define("todo", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
sequelize
  .sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
