import { Controller, Get, Param, Post, Body, Delete, Query, UseGuards, Patch, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTeamDto } from './dtos/create-team.dto';
import { GetTeamsQueryDto } from './dtos/get-teams-query.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @Get()
  getTeams(@Query() query: GetTeamsQueryDto): Promise<Team[]> {
    return this.teamService.getTeams(query);
  }

  @Get(':id')
  async getTeam(@Param('id') id: number): Promise<Team> {
    const team = await this.teamService.getTeam(id);
    if (!team) {
      throw new NotFoundException;
    }
    return team;
  }

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<Team>{
    return this.teamService.addTeam(createTeamDto);
  }

  @Patch(':id')
  async updateTeam(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamService.getTeam(id);
    if (!team) {
      throw new NotFoundException;
    }
    return this.teamService.updateTeam(updateTeamDto);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: number): Promise<Team> {
    const team = await this.teamService.getTeam(id);
    if (!team) {
      throw new NotFoundException;
    }
    return this.teamService.deleteTeam(id);
  }
}
