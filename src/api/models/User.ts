import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { Department } from './Department'
import { Role } from './Role'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    unique: true,
  })
  login: string

  @Column()
  firstName: string

  @OneToMany(() => Department, (departments) => departments.user)
  departments: Department[]

  @OneToOne(() => Role, (role) => role.user)
  role: Role

  @Column({
    unique: true,
  })
  email: string

  // Created + updated at
}
