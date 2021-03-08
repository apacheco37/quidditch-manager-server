import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/team/team.entity';
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
    cascade: ['insert']
  })
  @JoinColumn()
  skills: PlayerSkills;

  @OneToOne(type => PlayerStats, {
    cascade: ['insert']
  })
  @JoinColumn()
  stats: PlayerStats;

  @ManyToOne(type => Team, team => team.players)
  team: Team;
}
