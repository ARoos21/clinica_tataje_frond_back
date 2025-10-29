import { ApiProperty } from '@nestjs/swagger';

export class BuscarCitaPacienteDto {
  @ApiProperty({ description: 'ID del paciente', example: 123 })
  id_paciente: number;
}
