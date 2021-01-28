import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/team/team.entity';
import { PlayerSkills } from './player.skills.entity';
import { PlayerStats } from './player.stats.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50
  })
  first_name: string;

  @Column({
    length: 50
  })
  last_name: string;

  @Column()
  age: number;

  @OneToOne(type => PlayerSkills)
  @JoinColumn()
  skills: PlayerSkills;

  @OneToOne(type => PlayerStats)
  @JoinColumn()
  stats: PlayerStats;

  @ManyToOne(type => Team, team => team.players)
  team: Team;
}
