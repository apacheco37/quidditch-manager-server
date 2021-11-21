import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerService } from '../player/player.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Team } from './entities/team.entity';
import { Player } from '../player/entities/player.entity';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { GetTeamsQueryDto } from './dtos/get-teams-query.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly playerService: PlayerService
  ) {}

  getTeams(query: GetTeamsQueryDto): Promise<Team[]> {
    // there has to be a better way to do this
    return query.amount ?
      this.teamRepository.find(
        {
          take: query.amount,
          skip: query.page,
        }
      ) :
      this.teamRepository.find()
    ;
  }

  getTeam(id: number): Promise<Team> {
    return this.teamRepository.findOne(id);
  }

  addTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const players: Player[] = [];
    if (createTeamDto.addAutoGeneratedPlayers) {
      for (let i = 0; i < 10; i++) {
        players.push(this.playerService.returnAutoGeneratedPlayer());
      }
    }
    const team: Team = {
      name: createTeamDto.name,
      players
    };
    return this.teamRepository.save(team);
  }

  updateTeam(updateTeamDto: UpdateTeamDto): Promise<Team> {
    return this.teamRepository.save(updateTeamDto);
  }

  async deleteTeam(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne(id);
    return team !== null ? this.teamRepository.remove(team) : null;
  }
}
