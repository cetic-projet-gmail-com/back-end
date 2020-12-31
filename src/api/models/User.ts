import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { IsEmail, IsOptional, MinLength } from 'class-validator'
import { Department } from './Department'
import { Role } from './Role'

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

  @Column({
    type: 'timestamp without time zone',
    readonly: true,
  })
  createdAt: Date

  @Column({
    type: 'timestamp without time zone',
    readonly: true,
  })
  updatedAt: Date

  checkPassword(password: string) {
    return password === this.password
  }
}
