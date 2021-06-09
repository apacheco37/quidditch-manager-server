import { Controller, Get, Param, Post, Body, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Get()
  getTeams(@Query() query): Promise<Team[]> {
    return this.teamService.getTeams(query.amount, query.page);
  }

  @Get(':id')
  getTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.getTeam(id);
  }

  @Post()
  createTeam(@Body() team: Team): Promise<Team>{
    return this.teamService.addTeam(team);
  }

  @Put()
  updateTeam(@Body() team: Team): Promise<Team> {
    return this.teamService.updateTeam(team);
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
}
