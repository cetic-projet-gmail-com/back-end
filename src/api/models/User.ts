import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { IsEmail, IsOptional } from 'class-validator'
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

  @Column({
    nullable: false,
  })
  roleId: number

  @OneToMany(() => Department, departments => departments.user)
  departments: Department[]

  @ManyToOne(type => Role, role => role.user)
  @JoinColumn({ name: 'roleId' })
  role: Role

  @IsEmail()
  @IsOptional()
  @Column({
    nullable: true,
    unique: true,
  })
  email: string

  // Created + updated at
}
