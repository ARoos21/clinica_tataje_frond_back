import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { estadoCivil } from '../entities/paciente.entity';

export class UpdatePacienteDto {
  @ApiPropertyOptional({
    description: 'Número de teléfono del paciente',
    example: '+51987654321',
  })
  @IsOptional()
  @IsPhoneNumber('PE')
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Estado civil del paciente',
    enum: estadoCivil,
    example: estadoCivil.SOLTERO, // Ajusta según tus valores
  })
  @IsOptional()
  @IsString()
  estado_civil?: estadoCivil;
}
