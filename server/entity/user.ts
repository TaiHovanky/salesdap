import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './organization';

@Entity('users')
export class User extends BaseEntity {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationId: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.organizationId = organizationId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @Column({ name: 'organization_id', nullable: true })
  organizationId: string;

  @ManyToOne(() => Organization, (org: Organization) => org.users, { nullable: true })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;
}
