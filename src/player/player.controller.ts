import { Controller, Get, Post, Body, Put, Delete, Param, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Get()
  getPlayers(@Query() query): Promise<Player[]> {
    return this.playerService.getPlayers(query.amount, query.page);
  }

  @Get(':id')
  getPlayer(@Param('id') id: string): Promise<Player> {
    return this.playerService.getPlayer(id);
  }

  @Post()
  createPlayer(@Body() player: Player): Promise<Player>{
    console.log(player);
    return this.playerService.addPlayer(player);
  }

  @Put()
  updatePlayer(@Body() player: Player): Promise<Player> {
    return this.playerService.updatePlayer(player);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(id);
  }
}
