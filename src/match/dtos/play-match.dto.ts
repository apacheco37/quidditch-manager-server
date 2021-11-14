import { MatchOrderDto } from "./match-order.dto";

export interface PlayMatchDto {
  homeTeamOrder: MatchOrderDto;
  awayTeamOrder: MatchOrderDto;
}
