import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchTeamRatings {

  constructor() {
    this.scoring = 0;
    this.creation = 0;
    this.defence = 0;
    this.goalkeeping = 0;
    this.beating = 0;
    this.elusiveness = 0;
    this.bludgerResistance = 0;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column("real")
  scoring: number;

  @Column("real")
  creation: number;

  @Column("real")
  defence: number;

  @Column("real")
  goalkeeping: number;

  @Column("real")
  beating: number;

  @Column("real")
  elusiveness: number;

  @Column("real", {
    name: 'bludger_resistance'
  })
  bludgerResistance: number;
}
