import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PlayerStats {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  MatchesPlayed: number;

  @Column()
  GoalsScored: number;
}