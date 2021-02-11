import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Match } from './entities/match.entity';
import { MatchSimulation } from './match-simulation';
import { MatchOrder } from './entities/match.order.entity';

@Injectable()
export class MatchService {

  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>
  ) {}

  getMatch(id: string): Promise<Match> {
    return this.matchRepository.findOne(id);
  }

  simulateMatch(teamMatchOrder: MatchOrder, awayMatchOrder: MatchOrder): Promise<Match> {
    const match: Match = new MatchSimulation(teamMatchOrder, awayMatchOrder).simulateMatch();
    return this.matchRepository.save(match);
  }
}
