import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchTeamSummary {

  constructor() {
    this.goalsScored = 0;
    this.shotsMissed = 0;
    this.shotsMade = 0;
    this.steals = 0;
    this.turnovers = 0;
    this.saves = 0;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'goals_scored'
  })
  goalsScored: number;

  @Column({
    name: 'shots_missed'
  })
  shotsMissed: number;

  @Column({
    name: 'shots_made'
  })
  shotsMade: number;

  @Column()
  steals: number;

  @Column()
  turnovers: number;

  @Column()
  saves: number;
}
