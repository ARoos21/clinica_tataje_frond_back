import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoDto {
  @ApiProperty({ example: 1, description: 'ID del personal' })
  @IsInt()
  @IsNotEmpty()
  id_personal: number;

  @ApiProperty({ example: 2, description: 'ID de la especialidad' })
  @IsInt()
  @IsNotEmpty()
  id_especialidad: number;
}
