import { IsNotEmpty, IsInt, Max, Min, IsString, IsOptional } from 'class-validator';
import { PlayerSkillsDto } from './create-player-skills.dto';

export class CreatePlayerDto {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(15)
  @Max(99)
  age: number;

  @IsNotEmpty()
  skills: PlayerSkillsDto;

  @IsOptional()
  @IsInt()
  teamId: number;

}
