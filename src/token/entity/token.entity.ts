import { User } from "../../user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  token: string;

  @Column({ unique: true, nullable: false, default: Date.now })
  expiryDate: Date;

  @ManyToOne(() => User, (user) => user.tokens, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({name: 'userId'})
  user: User;
}
