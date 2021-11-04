import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './entities/player.entity';
import { Team } from '../team/entities/team.entity';
import { getRandomInt } from '../utils/getRandomInt';
import { UpdatePlayerDto } from './dtos/update-player.dto';

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
        relations: ["team"]
      }
    );
  }

  getPlayer(id: string): Promise<Player> {
    return this.playerRepository.findOne(id, {
      relations: ["team"]
    });
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

  returnAutoGeneratedPlayer(): Player {
    const player: Player = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      age: getRandomInt(17,30),
      skills: {
        scoring: getRandomInt(1,15),
        passing: getRandomInt(1,15),
        interceptions: getRandomInt(1,15),
        handling: getRandomInt(1,15),
        beatingAccuracy: getRandomInt(1,15),
        agility: getRandomInt(1,15),
        reflexes: getRandomInt(1,15),
        balance: getRandomInt(1,15),
        strength: getRandomInt(1,15)
      },
      stats: {
        matchesPlayed: 0,
        goalsScored: 0
      },
    };
    return player;
  }

  updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.playerRepository.save(updatePlayerDto);
  }

  async deletePlayer(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne(id);
    return player !== null ? this.playerRepository.remove(player) : null;
  }
}
