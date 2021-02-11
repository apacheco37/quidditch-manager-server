import { Controller, Get, Post, Param } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchOrder } from './entities/match.order.entity';
import { Match } from './entities/match.entity';

@Controller('match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService
  ) { }

  @Post('play')
  playMatch(homeTeamOrders: MatchOrder, awayTeamOrder: MatchOrder): Promise<Match> {
    return this.matchService.simulateMatch(homeTeamOrders, awayTeamOrder);
  }

  @Get(':id')
  getMatch(@Param('id') id: string): Promise<Match> {
    return this.matchService.getMatch(id);
  }
}
