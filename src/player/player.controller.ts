import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards, NotFoundException, Patch } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetPlayersQueryDto } from './dtos/get-players-query.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@UseGuards(JwtAuthGuard)
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  @Get()
  getPlayers(@Query() query: GetPlayersQueryDto): Promise<[Player[], number]> {
    return this.playerService.getPlayers(query.amount, query.page);
  }

  @Get(':id')
  async getPlayer(@Param('id') id: string): Promise<Player> {
    const player = await this.playerService.getPlayer(id);
    if (!player) {
      throw new NotFoundException;
    }
    return player;
  }

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player>{
    return this.playerService.addPlayer(createPlayerDto);
  }

  @Patch(':id')
  async updatePlayer(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.playerService.getPlayer(id);
    if (!player) {
      throw new NotFoundException;
    }
    return this.playerService.updatePlayer(updatePlayerDto);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string): Promise<Player> {
    const player = await this.playerService.getPlayer(id);
    if (!player) {
      throw new NotFoundException;
    }
    return this.playerService.deletePlayer(id);
  }
}
