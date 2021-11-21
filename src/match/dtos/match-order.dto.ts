import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsInt, IsNotEmpty } from "class-validator";

export class MatchOrderDto {

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  chasersIDs: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  beatersIDs: number[];

  @IsNotEmpty()
  @IsInt()
  keeperID: number;
}
