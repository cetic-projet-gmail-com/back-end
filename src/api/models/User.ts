import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { IsEmail, IsOptional, MinLength } from 'class-validator'

import { Department } from './Department'
import { Role } from './Role'
import { Event } from './Event'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  login: string

  @Column()
  firstName: string

  @ManyToMany(type => Department, departments => departments.users, { eager: true })
  @JoinTable()
  departments: Department[]

  @ManyToOne(type => Role, role => role.user, { eager: true })
  role: Role

  @OneToMany(type => Event, events => events.user, { eager: true })
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  checkPassword(password: string) {
    return password === this.password
  }
}
