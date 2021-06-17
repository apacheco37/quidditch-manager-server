import { IsNumber } from "class-validator";

export class GetTeamsQueryDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  page: number;
}
