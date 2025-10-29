import { ApiProperty } from '@nestjs/swagger';

export class MedicoResponseDto {
  @ApiProperty({ example: 1 })
  id_medico: number;

  @ApiProperty({
    example: {
      id_especialidad: 2,
      nombre: 'Pediatría',
    },
  })
  especialidad: {
    id_especialidad: number;
    nombre: string;
  };

  @ApiProperty({
    example: {
      id_personal: 5,
      nombres: 'Luis',
      apellido_paterno: 'Guerra',
      apellido_materno: 'Cruz',
      email: 'luis@correo.com',
    },
  })
  personalClinico: {
    id_personal: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    email: string;
  };
}
