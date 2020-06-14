import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  getTeams(amount: number, page: number): Promise<Team[]> {
    return this.teamRepository.find(
      {
        take: amount,
        skip: page,
      }
    );
  }

  getTeam(id: string): Promise<Team> {
    return this.teamRepository.findOne(id);
  }

  addTeam(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  updateTeam(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }

  async deleteTeam(id: string): Promise<Team> {
    let team: Team = await this.teamRepository.findOne(id);
    return team !== null ? this.teamRepository.remove(team) : null;
  }
}
