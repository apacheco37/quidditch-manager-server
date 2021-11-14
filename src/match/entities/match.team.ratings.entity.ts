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

  @Column()
  scoring: number;

  @Column()
  creation: number;

  @Column()
  defence: number;

  @Column()
  goalkeeping: number;

  @Column()
  beating: number;

  @Column()
  elusiveness: number;

  @Column({
    name: 'bludger_resistance'
  })
  bludgerResistance: number;
}
