import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PlayerStats {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'matches_played'
  })
  matchesPlayed: number;

  @Column({
    name: 'goals_scored'
  })
  goalsScored: number;
}
