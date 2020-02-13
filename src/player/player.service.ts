import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from './player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>
  ) {}

  getPlayers(): string {
    return 'Hola!';
  }

  // findAll(): Promise<User[]> {
  //   return this.playerRepository.find();
  // }

  // findOne(id: string): Promise<User> {
  //   return this.playerRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.playerRepository.delete(id);
  // }
}
