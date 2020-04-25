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

  getTeams(): Promise<Team[]> {
    return this.teamRepository.find();
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

  deleteTeam(id: string): Promise<void> {
    this.teamRepository.remove.delete(id);
  }
}
