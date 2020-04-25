import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) {}

  getPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  getPlayer(id: string): Promise<Player> {
    return this.playerRepository.findOne(id);
  }

  addPlayer(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  updatePlayer(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerRepository.delete(id);
  }
}
