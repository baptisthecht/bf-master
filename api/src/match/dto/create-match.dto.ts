import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsInt()
  teamAPlayer1Id: number;
  @IsOptional()
  @IsInt()
  teamAPlayer2Id?: number;
  @IsNotEmpty()
  @IsInt()
  teamBPlayer1Id: number;
  @IsOptional()
  @IsInt()
  teamBPlayer2Id?: number;
  @IsNotEmpty()
  @IsInt()
  teamAScore: number;
  @IsNotEmpty()
  @IsInt()
  teamBScore: number;
}
