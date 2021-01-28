import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlayerStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  matches_played: number;

  @Column()
  goals_scored: number;
}
