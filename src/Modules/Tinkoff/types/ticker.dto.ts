import { IsNotEmpty, IsString, Length } from "class-validator";

export class TickerDto {
  @IsString()
  @Length(3, 4)
  @IsNotEmpty()
  ticker: string;
}
