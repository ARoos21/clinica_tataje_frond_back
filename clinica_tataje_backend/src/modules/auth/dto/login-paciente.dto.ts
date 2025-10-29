import { ApiProperty } from '@nestjs/swagger';

export class LoginPacienteDto {
  @ApiProperty({ example: '12345678', description: 'DNI del paciente' })
  dni: string;

  @ApiProperty({ example: '1234', description: 'Contraseña del paciente' })
  password: string;
}
