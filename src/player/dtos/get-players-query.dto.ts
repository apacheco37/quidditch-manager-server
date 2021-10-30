import { IsNumber } from "class-validator";
import { Type } from 'class-transformer';

export class GetPlayersQueryDto {
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @Type(() => Number)
  @IsNumber()
  page: number;
}
