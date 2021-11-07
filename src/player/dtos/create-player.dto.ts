import { IsNotEmpty, IsInt, Max, Min, IsString, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '../entities/gender.enum';
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

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  skills: PlayerSkillsDto;

  @IsOptional()
  @IsInt()
  teamId: number;

}
