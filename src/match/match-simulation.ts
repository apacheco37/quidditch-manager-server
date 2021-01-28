import { Player } from 'src/player/entities/player.entity';
import { Match } from './entities/match.entity';
import { MatchTeamRatings } from './entities/match.team.ratings.entity';
import { MatchOrder } from './entities/match.order.entity';
import { MatchTeamSummary } from './entities/match.team.summary.entity';

interface PossessionOutcome {
  typeOfPlay: TypeOfPlay,
  player: Player,
}

enum TypeOfPlay {
  TURNOVER,
  STEAL,
  SHOTMISSED,
  SAVE,
  GOAL,
}

export class MatchSimulation {

  halfLength: number;
  timeRemainingInHalf: number;
  half: number;
  teamInPossession: number;
  match: Match;

  constructor(
    homeTeamOrder: MatchOrder,
    awayTeamOrder: MatchOrder
  ) {
    this.halfLength = 30;
    this.timeRemainingInHalf = this.halfLength * 60;
    this.half = 1;

    this.match.home_team_match_order = homeTeamOrder;
    this.match.away_team_match_order = awayTeamOrder;

    // 50/50 chance on which team starts with possession
    // 1 = home team, 0 =  away team
    this.teamInPossession = Math.random() >= 0.5 ? 1 : 0;
    this.match.home_team_ratings = this.calculateTeamRatings(homeTeamOrder);
    this.match.away_team_ratings = this.calculateTeamRatings(awayTeamOrder);
  }

  simulateMatch(): Match {
    while(this.timeRemainingInHalf > 0  && this.half <= 2) {
      // Length of each possession is between 20 and 30 seconds
      // TODO: adjust when there is less than 20 to 30 seconds
      let possessionTime: number = this.randomNumberInRange(20, 30);
      let possessionOutcome: PossessionOutcome = this.simulatePossession();

      switch (possessionOutcome.typeOfPlay) {
        case TypeOfPlay.TURNOVER:
          if (this.teamInPossession === 1) {
            this.match.home_team_match_summary.turnovers += 1;
          } else {
            this.match.away_team_match_summary.turnovers += 1;
          }
          this.teamInPossession = this.teamInPossession == 1 ? 0 : 1;
          break;
        case TypeOfPlay.STEAL:
          if (this.teamInPossession === 1) {
            this.match.away_team_match_summary.steals += 1;
          } else {
            this.match.home_team_match_summary.steals += 1;
          }
          this.teamInPossession = this.teamInPossession == 1 ? 0 : 1;
          break;
        case TypeOfPlay.SHOTMISSED:
          if (this.teamInPossession === 1) {
            this.match.home_team_match_summary.shots_missed += 1;
            this.match.home_team_match_summary.shots_made += 1;
            this.teamInPossession = 0;
          } else {
            this.match.away_team_match_summary.shots_missed += 1;
            this.match.away_team_match_summary.shots_made += 1;
            this.teamInPossession = 1;
          }
          break;
        case TypeOfPlay.SAVE:
          if (this.teamInPossession === 1) {
            this.match.home_team_match_summary.saves += 1;
            this.match.home_team_match_summary.shots_made += 1;
            this.teamInPossession = 0;
          } else {
            this.match.away_team_match_summary.saves += 1;
            this.match.away_team_match_summary.shots_made += 1;
            this.teamInPossession = 1;
          }
          break;
        case TypeOfPlay.GOAL:
          if (this.teamInPossession === 1) {
            this.match.home_team_match_summary.goals_scored += 1;
            this.match.home_team_match_summary.shots_made += 1;
            this.teamInPossession = 0;
          } else {
            this.match.away_team_match_summary.goals_scored += 1;
            this.match.away_team_match_summary.shots_made += 1;
            this.teamInPossession = 1;
          }
          break;
      }

      this.timeRemainingInHalf -= possessionTime;
      if (this.timeRemainingInHalf <= 0) {
        this.half += 1;
        this.timeRemainingInHalf = this.halfLength * 60
      }
    }
    
    return this.match;
  }

  private calculateTeamRatings(teamOrder: MatchOrder): MatchTeamRatings {
    let matchTeamRatings: MatchTeamRatings;

    teamOrder.chasers.forEach(chaser => {
      matchTeamRatings.scoring += chaser.skills.scoring;
      matchTeamRatings.creation += (chaser.skills.passing + chaser.skills.handling / 2);
      matchTeamRatings.defence += (chaser.skills.interceptions + chaser.skills.agility / 2);
      matchTeamRatings.elusiveness += (chaser.skills.reflexes + chaser.skills.agility);
      matchTeamRatings.bludger_resistance += chaser.skills.balance;
    });

    teamOrder.beaters.forEach(beater => {
      matchTeamRatings.beating += (beater.skills.strength + beater.skills.beating_accuracy);
      matchTeamRatings.elusiveness += (beater.skills.reflexes + beater.skills.agility);
      matchTeamRatings.bludger_resistance += beater.skills.balance;
    });

    matchTeamRatings.goalkeeping += (
      teamOrder.keeper.skills.reflexes + 
      teamOrder.keeper.skills.agility + 
      teamOrder.keeper.skills.handling
    );

    return matchTeamRatings;
  }

  private simulatePossession(): PossessionOutcome {
    let possessionOutcome: PossessionOutcome;

    if (this.checkTurnover()) {
      possessionOutcome.typeOfPlay = TypeOfPlay.TURNOVER;
      possessionOutcome.player = this.selectPlayer(TypeOfPlay.TURNOVER);
    }
    else if (this.checkSteal) {
      possessionOutcome.typeOfPlay = TypeOfPlay.TURNOVER;
      possessionOutcome.player = this.selectPlayer(TypeOfPlay.STEAL);;
    }
    else {
      possessionOutcome = this.checkShot();
    }

    return possessionOutcome;
  }

  private checkTurnover(): boolean {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private checkSteal(): boolean {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private checkShot(): PossessionOutcome {
    // if () {
    //   return PossessionOutcome.
    // }
    return null;
  }

  private selectPlayer(typeOfPlay: TypeOfPlay): Player {
    let player: Player;

    if (typeOfPlay === TypeOfPlay.TURNOVER || typeOfPlay === TypeOfPlay.SHOTMISSED || typeOfPlay === TypeOfPlay.GOAL) {
      player = this.teamInPossession === 1 ?
        this.match.home_team_match_order.chasers[this.randomNumberInRange(0,3)] :
        this.match.away_team_match_order.chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.STEAL) {
      player = this.teamInPossession === 1 ?
        this.match.away_team_match_order.chasers[this.randomNumberInRange(0,3)] :
        this.match.home_team_match_order.chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.SAVE) {
      player = this.teamInPossession === 1 ?
        this.match.away_team_match_order.keeper :
        this.match.home_team_match_order.keeper;
    }

    return player;
  }

  private randomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
