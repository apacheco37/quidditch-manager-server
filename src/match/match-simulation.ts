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

    this.match.HomeTeamMatchOrder = homeTeamOrder;
    this.match.AwayTeamMatchOrder = awayTeamOrder;

    // 50/50 chance on which team starts with possession
    // 1 = home team, 0 =  away team
    this.teamInPossession = Math.random() >= 0.5 ? 1 : 0;
    this.match.HomeTeamRatings = this.calculateTeamRatings(homeTeamOrder);
    this.match.AwayTeamRatings = this.calculateTeamRatings(awayTeamOrder);
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
            this.match.HomeTeamMatchSummary.Turnovers += 1;
          } else {
            this.match.AwayTeamMatchSummary.Turnovers += 1;
          }
          this.teamInPossession = this.teamInPossession == 1 ? 0 : 1;
          break;
        case TypeOfPlay.STEAL:
          if (this.teamInPossession === 1) {
            this.match.AwayTeamMatchSummary.Steals += 1;
          } else {
            this.match.HomeTeamMatchSummary.Steals += 1;
          }
          this.teamInPossession = this.teamInPossession == 1 ? 0 : 1;
          break;
        case TypeOfPlay.SHOTMISSED:
          if (this.teamInPossession === 1) {
            this.match.HomeTeamMatchSummary.ShotsMissed += 1;
            this.match.HomeTeamMatchSummary.ShotsMade += 1;
            this.teamInPossession = 0;
          } else {
            this.match.AwayTeamMatchSummary.ShotsMissed += 1;
            this.match.AwayTeamMatchSummary.ShotsMade += 1;
            this.teamInPossession = 1;
          }
          break;
        case TypeOfPlay.SAVE:
          if (this.teamInPossession === 1) {
            this.match.HomeTeamMatchSummary.Saves += 1;
            this.match.HomeTeamMatchSummary.ShotsMade += 1;
            this.teamInPossession = 0;
          } else {
            this.match.AwayTeamMatchSummary.Saves += 1;
            this.match.AwayTeamMatchSummary.ShotsMade += 1;
            this.teamInPossession = 1;
          }
          break;
        case TypeOfPlay.GOAL:
          if (this.teamInPossession === 1) {
            this.match.HomeTeamMatchSummary.GoalsScored += 1;
            this.match.HomeTeamMatchSummary.ShotsMade += 1;
            this.teamInPossession = 0;
          } else {
            this.match.AwayTeamMatchSummary.GoalsScored += 1;
            this.match.AwayTeamMatchSummary.ShotsMade += 1;
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

    teamOrder.Chasers.forEach(chaser => {
      matchTeamRatings.Scoring += chaser.Skills.Scoring;
      matchTeamRatings.Creation += (chaser.Skills.Passing + chaser.Skills.Handling / 2);
      matchTeamRatings.Defence += (chaser.Skills.Interceptions + chaser.Skills.Agility / 2);
      matchTeamRatings.Elusiveness += (chaser.Skills.Reflexes + chaser.Skills.Agility);
      matchTeamRatings.BludgerResistance += chaser.Skills.Balance;
    });

    teamOrder.Beaters.forEach(beater => {
      matchTeamRatings.Beating += (beater.Skills.Strength + beater.Skills.BeatingAccuracy);
      matchTeamRatings.Elusiveness += (beater.Skills.Reflexes + beater.Skills.Agility);
      matchTeamRatings.BludgerResistance += beater.Skills.Balance;
    });

    matchTeamRatings.Goalkeeping += (
      teamOrder.Keeper.Skills.Reflexes + 
      teamOrder.Keeper.Skills.Agility + 
      teamOrder.Keeper.Skills.Handling
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
        this.match.HomeTeamMatchOrder.Chasers[this.randomNumberInRange(0,3)] :
        this.match.AwayTeamMatchOrder.Chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.STEAL) {
      player = this.teamInPossession === 1 ?
        this.match.AwayTeamMatchOrder.Chasers[this.randomNumberInRange(0,3)] :
        this.match.HomeTeamMatchOrder.Chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.SAVE) {
      player = this.teamInPossession === 1 ?
        this.match.AwayTeamMatchOrder.Keeper :
        this.match.HomeTeamMatchOrder.Keeper;
    }

    return player;
  }

  private randomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
