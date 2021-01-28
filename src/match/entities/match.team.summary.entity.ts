import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchTeamSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goals_scored: number;

  @Column()
  shots_missed: number;

  @Column()
  shots_made: number;

  @Column()
  steals: number;

  @Column()
  turnovers: number;

  @Column()
  saves: number;
}
