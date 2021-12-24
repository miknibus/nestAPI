import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly dex: number;

  @IsOptional()
  @IsString({ each: true })
  readonly moves: string[];
}
