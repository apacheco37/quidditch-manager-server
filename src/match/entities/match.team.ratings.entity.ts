import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MatchTeamRatings {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Scoring: number;

  @Column()
  Creation: number;

  @Column()
  Defence: number;

  @Column()
  Goalkeeping: number;

  @Column()
  Beating: number;

  @Column()
  Elusiveness: number;

  @Column()
  BludgerResistance: number;
}