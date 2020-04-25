import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Player } from "src/player/entities/player.entity";

@Entity()
export class MatchOrder {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Chasers: Player[];

  @Column()
  Beaters: Player[];

  @Column()
  Keeper: Player;
}