import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MatchTeamSummary {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  GoalsScored: number;

  @Column()
  ShotsMissed: number;

  @Column()
  ShotsMade: number;

  @Column()
  Steals: number;

  @Column()
  Turnovers: number;

  @Column()
  Saves: number;
}