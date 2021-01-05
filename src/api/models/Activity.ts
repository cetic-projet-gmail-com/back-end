
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels.js'
import Task from './Task.js'
import User from './User.js'

@Entity()
export default class Activity extends BaseModels {
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

  @OneToMany(type => Task, tasks => tasks.activity, {
    cascade: true,
  })
  tasks: Task[]

  @ManyToOne(type => User)
  projectManager: User

  //TODO crmId, colour, aType
}
