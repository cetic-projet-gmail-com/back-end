
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels.js'
import Event from './Event.js'
import Activity from './Activity.js'

@Entity()
export default class Task extends BaseModels {
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

  @OneToMany(type => Event, events => events.task, {
    cascade: true,
  })
  events: Event[]

  @ManyToOne(type => Activity, activity => activity.tasks)
  activity: Activity
}
