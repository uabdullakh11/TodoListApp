
// import { Task } from "../../task/entity/task.entity";
// import { Token } from "../../token/entity/token.entity";

import  {Task}  from "../../task/entity/task.entity";
import { Token } from "../../token/entity/token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
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
