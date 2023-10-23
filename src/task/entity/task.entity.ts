// import { UUID } from 'crypto';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { v4 as uuidv4 } from 'uuid';

interface TaskCreationAttrs {
  title: string;
  date: string;
  userId: string;
}

@Table({ tableName: 'tasks' })
export class Task {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  date: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  completed: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  author: User;

  @BeforeCreate
  static generateID = async(task: Task)=>{
    task.id = uuidv4()
  }
}
