import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm'
import { User } from './User'

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @ManyToOne(type => User)
  responsible

  @ManyToMany(type => User, user => user.departments)
  users: User[]

  @Column({
    type: 'timestamp without time zone',
    readonly: true
  })
  createdAt: Date

  @Column({
    type: 'timestamp without time zone',
    readonly: true
  })
  updatedAt: Date
}
