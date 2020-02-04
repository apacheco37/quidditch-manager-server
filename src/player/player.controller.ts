import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {

  }

  @Get()
  getPlayers(): string {
    return this.playerService.getPlayers();
  }
}
