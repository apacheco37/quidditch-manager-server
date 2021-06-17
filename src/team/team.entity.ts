import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 50
  })
  name: string;

  @OneToMany(type => Player, player => player.team, {
    eager: true,
    cascade: ['insert'],
  })
  players: Player[];
}
