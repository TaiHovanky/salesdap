import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { User } from './user';

@Entity('organizations')
export class Organization extends BaseEntity {
  constructor(
    name: string
  ) {
    super();
    this.name = name;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user: User) => user.organization)
  users: Array<User>;
}
