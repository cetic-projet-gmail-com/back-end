import { Entity, Column, OneToMany } from 'typeorm'

import BaseModels from './BaseModels'
import User from './User'

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
