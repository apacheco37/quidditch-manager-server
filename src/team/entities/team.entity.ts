import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from '../../player/entities/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 50,
    unique: true
  })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Player, player => player.team, {
    eager: true,
    cascade: ['insert'],
  })
  players: Player[];
}
