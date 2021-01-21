
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels'
import Colour from './Colour'
import Task from './Task'
import User from './User'

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

  @ManyToOne(type => Colour)
  colour: Colour

  @ManyToOne(type => User)
  projectManager: User

  //TODO crmId, colour, aType
}
