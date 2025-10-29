import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMedicoDto {
  @ApiPropertyOptional({
    description: 'ID de la especialidad',
    minimum: 1,
    type: Number,
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  id_especialidad?: number;
}
