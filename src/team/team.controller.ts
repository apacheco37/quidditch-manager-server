import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Get()
  getTeams(): Promise<Team[]> {
    return this.teamService.getTeams();
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
