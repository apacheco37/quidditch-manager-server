import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerModule } from '../player/player.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Match } from './entities/match.entity';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    PlayerModule,
    TeamModule,
  ],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
