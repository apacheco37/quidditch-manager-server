import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Team } from 'src/team/team.entity';
import { PlayerSkills } from './player.skills.entity';
import { PlayerStats } from './player.stats.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    length: 50
  })
  FirstName: string;

  @Column({
    length: 50
  })
  LastName: string;

  @Column()
  Age: number;

  @OneToOne(type => PlayerSkills)
  @JoinColumn()
  Skills: PlayerSkills;

  @OneToOne(type => PlayerStats)
  @JoinColumn()
  Stats: PlayerStats;

  @ManyToOne(type => Team, team => team.Players)
  Team: Team;
}
