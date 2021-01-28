import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { MatchOrder } from './match.order.entity';
import { MatchTeamSummary } from './match.team.summary.entity';
import { MatchTeamRatings } from './match.team.ratings.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => MatchOrder)
  @JoinColumn()
  home_team_match_order: MatchOrder;

  @OneToOne(type => MatchOrder)
  @JoinColumn()
  away_team_match_order: MatchOrder;

  @OneToOne(type => MatchTeamSummary)
  @JoinColumn()
  home_team_match_summary: MatchTeamSummary;

  @OneToOne(type => MatchTeamSummary)
  @JoinColumn()
  away_team_match_summary: MatchTeamSummary;

  @OneToOne(type => MatchTeamRatings)
  @JoinColumn()
  home_team_ratings: MatchTeamRatings;

  @OneToOne(type => MatchTeamRatings)
  @JoinColumn()
  away_team_ratings: MatchTeamRatings;
}
