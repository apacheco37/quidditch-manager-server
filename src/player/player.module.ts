import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { Team } from '../team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}
