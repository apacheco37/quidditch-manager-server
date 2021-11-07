import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeOrmConfig from 'ormconfig';
import { PlayerModule } from './player/player.module';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PlayerModule,
    TeamModule,
    MatchModule,
    AuthModule,
    UsersModule
  ],
})
export class AppModule {}
