import { ApiProperty } from '@nestjs/swagger';

export class ServicioReniec {
  @ApiProperty({ example: '12345678', description: 'Número de documento' })
  number: string;

  @ApiProperty({ example: 'Juan', description: 'Nombres' })
  name: string;

  @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  date_of_birth: string;

  @ApiProperty({ example: 'Masculino', enum: ['Femenino', 'Masculino'], description: 'Género' })
  gender: 'Femenino' | 'Masculino';

  @ApiProperty({ example: 'Pérez', description: 'Primer apellido' })
  first_last_name: string;

  @ApiProperty({ example: 'García', description: 'Segundo apellido' })
  second_last_name: string;

  @ApiProperty({ example: 'Lima', description: 'Departamento' })
  department: string;

  @ApiProperty({ example: 'Lima', description: 'Provincia' })
  province: string;

  @ApiProperty({ example: 'Miraflores', description: 'Distrito' })
  district: string;

  @ApiProperty({ example: '150122', description: 'Código ubigeo' })
  ubigeo: string;
}
