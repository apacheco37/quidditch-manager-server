/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class MatchOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Player, player => player.id)
  chasers: Player[];

  @OneToMany(type => Player, player => player.id)
  beaters: Player[];

  @OneToOne(type => Player)
  @JoinColumn()
  keeper: Player;
}
