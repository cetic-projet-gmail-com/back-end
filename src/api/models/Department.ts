import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.departments)
  user: User
}
