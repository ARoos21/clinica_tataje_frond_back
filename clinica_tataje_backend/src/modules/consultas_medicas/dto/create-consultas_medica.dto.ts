import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateConsultasMedicaDto {
  @IsNumber()
  historiaId: number;

  @IsNumber()
  citaId: number;

  @IsOptional()
  @IsString()
  diagnostico: string;

  @IsOptional()
  @IsString()
  tratamiento: string;

  @IsOptional()
  @IsString()
  observaciones: string;
}
