import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm'

import BaseModels from './BaseModels'
import Activity from './Activity'

@Entity()
export default class Department extends BaseModels {
  @Column({
    nullable: false,
    unique: true,
  })
  name: string

  @Column({
    nullable: false,
    unique: true,
  })
  code: string
}
