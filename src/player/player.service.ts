import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
  getPlayers(): string {
    return 'Hola!';
  }
}
