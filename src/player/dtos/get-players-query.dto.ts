import { IsNumber } from "class-validator";

export class GetPlayersQueryDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  page: number;
}
