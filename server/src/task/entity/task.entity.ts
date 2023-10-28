// import { User } from "../../user/entity/user.entity";
import { User } from "../../user/entity/user.entity";


import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: false })
  date: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: false, default: false })
  completed: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  // @BeforeInsert()
  // insertCreated(): void {
  //   this.created_at = new Date();
  // }
}
