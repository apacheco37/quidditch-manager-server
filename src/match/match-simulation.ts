import { Player } from 'src/player/entities/player.entity';
import { Match } from './entities/match.entity';
import { MatchTeamRatings } from './entities/match.team.ratings.entity';
import { MatchOrder } from './entities/match.order.entity';
import { MatchTeamSummary } from './entities/match.team.summary.entity';
import { Team } from 'src/team/entities/team.entity';

// interface PossessionOutcome {
//   typeOfPlay: TypeOfPlay,
//   player: Player,
// }

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
  match: Match = new Match();

  constructor(
    homeTeam: Team,
    awayTeam: Team,
    homeTeamOrder: MatchOrder,
    awayTeamOrder: MatchOrder
  ) {
    this.halfLength = 30; // minutes
    this.timeRemainingInHalf = this.halfLength * 60; // seconds
    this.half = 1;
    // 50/50 chance on which team starts with possession
    // 1 = home team, 0 = away team
    this.teamInPossession = Math.random() >= 0.5 ? 1 : 0;

    this.match.homeTeam = homeTeam;
    this.match.awayTeam = awayTeam;
    this.match.homeTeamMatchOrder = homeTeamOrder;
    this.match.awayTeamMatchOrder = awayTeamOrder;
    this.match.homeTeamMatchSummary = new MatchTeamSummary();
    this.match.awayTeamMatchSummary = new MatchTeamSummary();
    this.match.homeTeamRatings = this.calculateTeamRatings(homeTeamOrder);
    this.match.awayTeamRatings = this.calculateTeamRatings(awayTeamOrder);
  }

  simulateMatch(): Match {
    while(this.timeRemainingInHalf > 0  && this.half <= 2) {
      this.simulatePossession();

      if (this.timeRemainingInHalf <= 0) {
        this.half += 1;
        this.timeRemainingInHalf = this.halfLength * 60;
      }
    }

    return this.match;
  }

  private calculateTeamRatings(teamOrder: MatchOrder): MatchTeamRatings {
    const matchTeamRatings: MatchTeamRatings = new MatchTeamRatings();

    teamOrder.chasers.forEach(chaser => {
      matchTeamRatings.scoring += chaser.skills.scoring;
      matchTeamRatings.creation += (chaser.skills.passing + chaser.skills.handling / 2);
      matchTeamRatings.defence += (chaser.skills.interceptions + chaser.skills.agility / 2);
      matchTeamRatings.elusiveness += (chaser.skills.reflexes + chaser.skills.agility);
      matchTeamRatings.bludgerResistance += chaser.skills.balance;
    });

    teamOrder.beaters.forEach(beater => {
      matchTeamRatings.beating += (beater.skills.strength + beater.skills.beatingAccuracy);
      matchTeamRatings.elusiveness += (beater.skills.reflexes + beater.skills.agility);
      matchTeamRatings.bludgerResistance += beater.skills.balance;
    });

    matchTeamRatings.goalkeeping += (
      teamOrder.keeper.skills.reflexes +
      teamOrder.keeper.skills.agility +
      teamOrder.keeper.skills.handling
    );

    return matchTeamRatings;
  }

  private simulatePossession(): void {
    // Length of each possession is between 20 and 30 seconds
    // TODO: adjust when there is less than 20 to 30 seconds
    const possessionTime: number = this.randomNumberInRange(20, 30);
    this.timeRemainingInHalf -= possessionTime;

    if (this.checkTurnover()) {
      this.doTurnover();
    } else if (this.checkSteal()) {
      this.doSteal();
    } else if (this.checkShotMissed()) {
      this.doShotMissed();
    } else if (this.checkSave()) {
      this.doSave();
    } else {
      this.doGoal();
    }
  }

  private checkTurnover(): boolean {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private checkSteal(): boolean {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private checkShotMissed(): boolean {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private checkSave() {
    // TODO: change 0.5 for calculated value
    return Math.random() > 0.5 ? true : false;
  }

  private doTurnover(): void {
    if (this.teamInPossession === 1) {
      this.match.homeTeamMatchSummary.turnovers += 1;
    } else {
      this.match.awayTeamMatchSummary.turnovers += 1;
    }
    this.swapTeamInPossession();
  }

  private doSteal(): void {
    if (this.teamInPossession === 1) {
      this.match.awayTeamMatchSummary.steals += 1;
    } else {
      this.match.homeTeamMatchSummary.steals += 1;
    }
    this.swapTeamInPossession();
  }

  private doShotMissed(): void {
    if (this.teamInPossession === 1) {
      this.match.homeTeamMatchSummary.shotsMissed += 1;
      this.match.homeTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 0;
    } else {
      this.match.awayTeamMatchSummary.shotsMissed += 1;
      this.match.awayTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 1;
    }
  }

  private doSave(): void {
    if (this.teamInPossession === 1) {
      this.match.homeTeamMatchSummary.saves += 1;
      this.match.homeTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 0;
    } else {
      this.match.awayTeamMatchSummary.saves += 1;
      this.match.awayTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 1;
    }
  }

  private doGoal(): void {
    if (this.teamInPossession === 1) {
      this.match.homeTeamMatchSummary.goalsScored += 1;
      this.match.homeTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 0;
    } else {
      this.match.awayTeamMatchSummary.goalsScored += 1;
      this.match.awayTeamMatchSummary.shotsMade += 1;
      this.teamInPossession = 1;
    }
  }

  private selectPlayer(typeOfPlay: TypeOfPlay): Player {
    let player: Player;

    if (typeOfPlay === TypeOfPlay.TURNOVER || typeOfPlay === TypeOfPlay.SHOTMISSED || typeOfPlay === TypeOfPlay.GOAL) {
      player = this.teamInPossession === 1 ?
        this.match.homeTeamMatchOrder.chasers[this.randomNumberInRange(0,3)] :
        this.match.awayTeamMatchOrder.chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.STEAL) {
      player = this.teamInPossession === 1 ?
        this.match.awayTeamMatchOrder.chasers[this.randomNumberInRange(0,3)] :
        this.match.homeTeamMatchOrder.chasers[this.randomNumberInRange(0,3)];
    } else if (typeOfPlay === TypeOfPlay.SAVE) {
      player = this.teamInPossession === 1 ?
        this.match.awayTeamMatchOrder.keeper :
        this.match.homeTeamMatchOrder.keeper;
    }

    return player;
  }

  private randomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private swapTeamInPossession(): void {
    this.teamInPossession = this.teamInPossession === 1 ? 0 : 1;
  }
}
