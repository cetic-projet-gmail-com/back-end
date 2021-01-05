import { Entity, Column, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels.js'
import User from './User.js'
import Task from './Task.js'

@Entity()
export default class Event extends BaseModels {
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

  @ManyToOne(type => User, user => user.events, {
    cascade: true,
  })
  user: User

  @ManyToOne(type => Task, task => task.events)
  task: Task
}
