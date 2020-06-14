import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Player } from "src/player/entities/player.entity";

@Entity()
export class MatchOrder {
  @PrimaryGeneratedColumn()
  Id: number;

  @OneToMany(type => Player, player => player.Id)
  Chasers: Player[];

  @OneToMany(type => Player, player => player.Id)
  Beaters: Player[];

  @OneToOne(type => Player)
  @JoinColumn()
  Keeper: Player;
}