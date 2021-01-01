
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import { Task } from './Task'
import { User } from './User'

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: false,
  })
  name: string

  @Column({
    nullable: false,
    unique: false,
  })
  description: string

  @Column()
  ended: boolean = false

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => Task, tasks => tasks.activity, {
    cascade: true,
    eager: true,
  })
  tasks: Task[]

  @ManyToOne(type => User)
  projectManager: User

  //TODO crmId, colour, aType
}
