import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerService } from '../player/player.service';
import { Match } from './entities/match.entity';
import { MatchSimulation } from './match-simulation';
import { PlayMatchDto } from './dtos/play-match.dto';
import { MatchOrder } from './entities/match.order.entity';
import { MatchOrderDto } from './dtos/match-order.dto';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly playerService: PlayerService,
    private readonly teamService: TeamService,
  ) {}

  getMatch(id: number): Promise<Match> {
    return this.matchRepository.findOne(id);
  }

  async deleteMatch(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne(id);
    return match !== null ? this.matchRepository.remove(match) : null;
  }

  async simulateMatch(playMatchDto: PlayMatchDto): Promise<Match> {
    const homeTeam = await this.teamService.getTeam(playMatchDto.homeTeamID);
    const awayTeam = await this.teamService.getTeam(playMatchDto.awayTeamID);
    const homeTeamMatchOrder = await this.buildMatchOrder(playMatchDto.homeTeamOrder);
    const awayTeamMatchOrder = await this.buildMatchOrder(playMatchDto.awayTeamOrder);

    const match: Match = new MatchSimulation(
      homeTeam,
      awayTeam,
      homeTeamMatchOrder,
      awayTeamMatchOrder
    ).simulateMatch();
    return this.matchRepository.save(match);
  }

  private async buildMatchOrder(matchOrderDto: MatchOrderDto): Promise<MatchOrder> {
    const teamChasers = await this.playerService.getPlayersByIDs(matchOrderDto.chasersIDs);
    const teamBeaters = await this.playerService.getPlayersByIDs(matchOrderDto.beatersIDs);
    const teamKeeper = await this.playerService.getPlayer(matchOrderDto.keeperID);
    const teamMatchOrder: MatchOrder = {
      chasers: teamChasers,
      beaters: teamBeaters,
      keeper: teamKeeper
    };
    return teamMatchOrder;
  }
}
