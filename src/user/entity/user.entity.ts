// import { UUID } from 'crypto';
// import { BeforeCreate, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "../../task/entity/task.entity";
import { Token } from "../../token/entity/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { v4 as uuidv4 } from 'uuid';

// interface UserCreationAttrs {
//   email: string;
//   login: string;
//   password: string;
// }

// @Table({ tableName: "users" })

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  avatar: string;

  // @HasMany(() => Task)
  // tasks: Task[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  // @BeforeCreate
  // static generateID = async(user: User)=>{
  //   user.id = uuidv4()
  // }
}
