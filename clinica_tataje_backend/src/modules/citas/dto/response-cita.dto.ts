import { ApiProperty } from '@nestjs/swagger';

export class CitaResponseDto {
  @ApiProperty()
  id_cita: number;

  @ApiProperty()
  fecha: string;

  @ApiProperty()
  hora: string;

  @ApiProperty()
  motivo: string;

  @ApiProperty()
  estado: string;

  @ApiProperty({
    type: () => ({
      id_paciente: { type: 'number' },
      dni: { type: 'string' },
      nombres: { type: 'string' },
      apellido_paterno: { type: 'string' },
      apellido_materno: { type: 'string' },
      telefono: { type: 'string' },
    }),
  })
  id_paciente: {
    id_paciente: number;
    dni: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
  };

  @ApiProperty({
    type: () => ({
      id_medico: { type: 'number' },
      id_personal: {
        type: 'object',
        properties: {
          id_personal: { type: 'number' },
          nombres: { type: 'string' },
          apellido_paterno: { type: 'string' },
        },
      },
      id_especialidad: {
        type: 'object',
        properties: {
          id_especialidad: { type: 'number' },
          nombre: { type: 'string' },
        },
      },
    }),
  })
  id_medico: {
    id_medico: number;
    id_personal: {
      id_personal: number;
      nombres: string;
      apellido_paterno: string;
    };
    id_especialidad: {
      id_especialidad: number;
      nombre: string;
    };
  };
}
