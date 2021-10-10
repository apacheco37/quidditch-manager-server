/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from '../../team/entities/team.entity';
import { PlayerSkills } from './player.skills.entity';
import { PlayerStats } from './player.stats.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'first_name',
    length: 50
  })
  firstName: string;

  @Column({
    name: 'last_name',
    length: 50
  })
  lastName: string;

  @Column()
  age: number;

  @OneToOne(type => PlayerSkills, {
    cascade: ['insert'],
    eager: true
  })
  @JoinColumn()
  skills: PlayerSkills;

  @OneToOne(type => PlayerStats, {
    cascade: ['insert'],
    eager: true
  })
  @JoinColumn()
  stats: PlayerStats;

  @ManyToOne(type => Team, team => team.players)
  team?: Team;
}
