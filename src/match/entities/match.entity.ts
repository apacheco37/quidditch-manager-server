import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { MatchOrder } from './match.order.entity';
import { MatchTeamSummary } from './match.team.summary.entity';
import { MatchTeamRatings } from './match.team.ratings.entity';
import { Team } from 'src/team/entities/team.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, {
    eager: true
  })
  @JoinColumn({
    name: 'home_team'
  })
  homeTeam: Team;

  @ManyToOne(() => Team, {
    eager: true
  })
  @JoinColumn({
    name: 'away_team'
  })
  awayTeam: Team;

  @OneToOne(() => MatchOrder, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'home_team_match_order'
  })
  homeTeamMatchOrder: MatchOrder;

  @OneToOne(() => MatchOrder, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'away_team_match_order'
  })
  awayTeamMatchOrder: MatchOrder;

  @OneToOne(() => MatchTeamSummary, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'home_team_match_summary'
  })
  homeTeamMatchSummary: MatchTeamSummary;

  @OneToOne(() => MatchTeamSummary, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'away_team_match_summary'
  })
  awayTeamMatchSummary: MatchTeamSummary;

  @OneToOne(() => MatchTeamRatings, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'home_team_ratings'
  })
  homeTeamRatings: MatchTeamRatings;

  @OneToOne(() => MatchTeamRatings, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  @JoinColumn({
    name: 'away_team_ratings'
  })
  awayTeamRatings: MatchTeamRatings;
}
