import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, ValidateNested } from "class-validator";
import { MatchOrderDto } from "./match-order.dto";

export class PlayMatchDto {

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  homeTeamID: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  awayTeamID: number;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => MatchOrderDto)
  homeTeamOrder: MatchOrderDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => MatchOrderDto)
  awayTeamOrder: MatchOrderDto;
}
