/* import { INTEGER } from "sequelize"

const Todo = () =>{
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    completed : {
        type: Boolean,
        default: false,
        required: true,
    }
    userId: {
        type: INTEGER,
        required: true,
    }

}
const Todo = model('Todo', Todo)
import { Sequelize, DataType } from "sequelize";*/
import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
const Todo = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'users',
        schema: 'schema'
      },
      key: 'id'
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
});
// sequelize
//   .sync({force: false})
//   .then(() => console.log('Correct synchronization!'))
//   .catch((err) => console.log(err));

export default Todo;
