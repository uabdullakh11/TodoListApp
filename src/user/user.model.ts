// import { UUID } from 'crypto';
import { BeforeCreate, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "src/task/entity/task.entity";
import { v4 as uuidv4 } from 'uuid';

interface UserCreationAttrs {
  email: string;
  login: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @HasMany(() => Task)
  tasks: Task[];

  @BeforeCreate
  static generateID = async(user: User)=>{
    user.id = uuidv4()
  }

}
