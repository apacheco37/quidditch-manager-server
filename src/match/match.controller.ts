import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { PlayMatchDto } from './dtos/play-match.dto';

@UseGuards(JwtAuthGuard)
@Controller('match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService
  ) { }

  @Post('play')
  playMatch(@Body() playMatchDto: PlayMatchDto): Promise<Match> {
    return this.matchService.simulateMatch(playMatchDto);
  }

  @Get(':id')
  getMatch(@Param('id') id: string): Promise<Match> {
    return this.matchService.getMatch(id);
  }
}
