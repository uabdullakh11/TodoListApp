import { User } from "../../user/entity/user.entity";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ nullable: false })
  date: string;

  @Column({ nullable: false, default: false })
  completed: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({name: 'userId'})
  user: User;
}
