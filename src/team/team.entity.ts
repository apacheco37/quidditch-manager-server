import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    length: 50
  })
  Name: string;

  @OneToMany(type => Player, player => player.Team)
  Players: Player[];
}