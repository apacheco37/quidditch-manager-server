import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { MatchOrder } from "./match.order.entity";
import { MatchTeamSummary } from "./match.team.summary.entity";
import { MatchTeamRatings } from "./match.team.ratings.entity";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  Id: number;

  @OneToOne(type => MatchOrder)
  @JoinColumn()
  HomeTeamMatchOrder: MatchOrder;

  @OneToOne(type => MatchOrder)
  @JoinColumn()
  AwayTeamMatchOrder: MatchOrder;

  @OneToOne(type => MatchTeamSummary)
  @JoinColumn()
  HomeTeamMatchSummary: MatchTeamSummary;

  @OneToOne(type => MatchTeamSummary)
  @JoinColumn()
  AwayTeamMatchSummary: MatchTeamSummary;

  @OneToOne(type => MatchTeamRatings)
  @JoinColumn()
  HomeTeamRatings: MatchTeamRatings;

  @OneToOne(type => MatchTeamRatings)
  @JoinColumn()
  AwayTeamRatings: MatchTeamRatings;
}