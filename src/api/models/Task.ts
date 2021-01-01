
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import { Event } from './Event'
import { Activity } from './Activity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(type => Event, events => events.task, {
    cascade: true,
  })
  events: Event[]

  @ManyToOne(type => Activity, activity => activity.tasks)
  activity: Activity
}
