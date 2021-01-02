import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels'
import User from './User'

@Entity()
export default class Department extends BaseModels {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @ManyToOne(type => User)
  responsible: User

  @ManyToMany(type => User, users => users.departments)
  users: User[]
}
