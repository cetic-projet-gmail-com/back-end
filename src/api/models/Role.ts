import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from './User'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @OneToMany(type => User, user => user.role, {
    cascade: true,
  })
  user: User[]
}
