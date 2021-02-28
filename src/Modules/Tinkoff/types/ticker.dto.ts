import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class TickerDto {
  @IsString()
  @Min(3)
  @Max(4)
  @IsNotEmpty()
  ticker: string;
}
