import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default
} from 'sequelize-typescript'

@Table
class Task extends Model {
  @Column(DataType.STRING)
  content: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  status: boolean

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}

export { Task };
