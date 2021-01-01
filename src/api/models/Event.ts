import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm'
import { User } from './User'
import { Task } from './Task'

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
  })
  description: string

  @Column({
    type: 'timestamp without time zone',
  })
  startAt

  @Column({
    type: 'timestamp without time zone',
  })
  endAt

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(type => User, user => user.events, {
    cascade: true,
  })
  user: User

  @ManyToOne(type => Task, task => task.events)
  task: Task
}
