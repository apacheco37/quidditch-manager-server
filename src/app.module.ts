import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { typeOrmConfig } from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PlayerModule,
    TeamModule,
    MatchModule
  ],
})
export class AppModule {}
