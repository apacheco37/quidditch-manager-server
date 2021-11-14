import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerService } from '../player/player.service';
import { Match } from './entities/match.entity';
import { MatchSimulation } from './match-simulation';
import { PlayMatchDto } from './dtos/play-match.dto';
import { MatchOrder } from './entities/match.order.entity';
import { MatchOrderDto } from './dtos/match-order.dto';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly playerService: PlayerService
  ) {}

  getMatch(id: string): Promise<Match> {
    return this.matchRepository.findOne(id);
  }

  async simulateMatch(playMatchDto: PlayMatchDto): Promise<Match> {
    const homeTeamMatchOrder = await this.buildMatchOrder(playMatchDto.homeTeamOrder);

    const awayTeamMatchOrder = await this.buildMatchOrder(playMatchDto.awayTeamOrder);

    const match: Match = new MatchSimulation(
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
