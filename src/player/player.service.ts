import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/team/team.entity';
import { Repository } from 'typeorm';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './entities/player.entity';
import { PlayerStats } from './entities/player.stats.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>
  ) {}

  getPlayers(amount: number, page: number): Promise<Player[]> {
    return this.playerRepository.find(
      {
        take: amount,
        skip: page,
      }
    );
  }

  getPlayer(id: string): Promise<Player> {
    return this.playerRepository.findOne(id);
  }

  async addPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    let team: Team = null;
    if (createPlayerDto.teamId) {
      team = await this.teamRepository.findOne(createPlayerDto.teamId);
    }
    const player: Player = {
      firstName: createPlayerDto.firstName,
      lastName: createPlayerDto.lastName,
      age: createPlayerDto.age,
      skills: createPlayerDto.skills,
      stats: {
        matchesPlayed: 0,
        goalsScored: 0
      },
      team
    };
    return this.playerRepository.save(player);
  }

  updatePlayer(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async deletePlayer(id: string): Promise<Player> {
    const player: Player = await this.playerRepository.findOne(id);
    return player !== null ? this.playerRepository.remove(player) : null;
  }
}
