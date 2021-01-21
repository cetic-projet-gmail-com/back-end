import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { IsEmail, IsOptional, MinLength } from 'class-validator'

import BaseModels from './BaseModels'
import Department from './Department'
import Role from './Role'
import Event from './Event'

@Entity()
export default class User extends BaseModels {
  @Column({
    nullable: false,
    unique: true,
  })
  login: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @ManyToMany(type => Department, departments => departments.users, {
    eager: true
  })
  @JoinTable()
  departments: Department[]

  @ManyToOne(type => Role)
  role: Role

  @OneToMany(type => Event, events => events.user)
  events: Event[]

  @IsEmail()
  @IsOptional()
  @Column({
    nullable: true,
    unique: true,
  })
  email: string

  @MinLength(8)
  @Column({
    nullable: false,
  })
  password: string

  checkPassword(password: string) {
    return password === this.password
  }
}
