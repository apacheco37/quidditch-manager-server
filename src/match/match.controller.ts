import { Controller, Get, Post, Param, UseGuards, Body, Delete, NotFoundException } from '@nestjs/common';
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
  getMatch(@Param('id') id: number): Promise<Match> {
    const match = this.matchService.getMatch(id);
    if (!match) {
      throw new NotFoundException;
    }
    return match;
  }

  // CASCADES DON'T SEEM TO BE WORKING, DOUBLE CHECK WHEN USING
  @Delete(':id')
  async deleteMatch(@Param('id') id: number): Promise<Match> {
    const match = await this.matchService.getMatch(id);
    if (!match) {
      throw new NotFoundException;
    }
    return this.matchService.deleteMatch(id);
  }
}
