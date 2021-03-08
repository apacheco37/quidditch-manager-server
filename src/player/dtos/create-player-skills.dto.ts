import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PlayerSkillsDto {

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  scoring: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  passing: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  interceptions: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  handling: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  beatingAccuracy: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  agility: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  reflexes: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  balance: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(20)
  strength: number;
}
