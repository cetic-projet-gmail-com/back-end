import { Entity, Column, OneToMany } from 'typeorm'

import BaseModels from './BaseModels.js'
import User from './User.js'

@Entity()
export default class Role extends BaseModels {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @OneToMany(type => User, user => user.role, {
    cascade: true,
  })
  user: User[]
}
