import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProfessionScores } from './profession-scores.entity';

@Table({ tableName: 'professions' })
export class Profession extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  requirements: string;

  @Column({ allowNull: false })
  sphere: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  archived: boolean;

  @HasMany(() => ProfessionScores, { onDelete: 'CASCADE' })
  professionScores: ProfessionScores[];
}
