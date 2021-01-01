import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
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
  responsible: User

  @ManyToMany(type => User, user => user.departments)
  users: User[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
