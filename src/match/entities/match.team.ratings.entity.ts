import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatchTeamRatings {
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

  @Column()
  bludger_resistance: number;
}
