import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

export default abstract class BaseModels {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
