import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [TypeOrmModule.forRoot(), PlayerModule],
})
export class AppModule {}
