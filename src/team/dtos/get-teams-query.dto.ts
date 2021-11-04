import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetTeamsQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  amount: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page: number;
}
