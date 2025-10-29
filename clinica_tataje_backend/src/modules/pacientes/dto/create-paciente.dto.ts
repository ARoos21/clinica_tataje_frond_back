import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { estadoCivil } from '../entities/paciente.entity';

export class CreatePacienteDto {
  @ApiProperty({ example: '12345678', description: 'DNI del paciente', minLength: 8, maxLength: 8 })
  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @ApiProperty({ example: 'Luis', description: 'Nombres del paciente' })
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty({ example: 'Guerra', description: 'Apellido paterno del paciente' })
  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @ApiProperty({ example: 'Perez', description: 'Apellido materno del paciente' })
  @IsNotEmpty()
  @IsString()
  apellido_materno: string;

  @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento', type: String, format: 'date' })
  @IsNotEmpty()
  @IsDate()
  fecha_nacimiento: Date;

  @ApiProperty({ example: 'Masculino', enum: ['Masculino', 'Femenino'], description: 'Género del paciente' })
  @IsNotEmpty()
  @IsEnum(['Masculino', 'Femenino'])
  genero: 'Masculino' | 'Femenino';

  @ApiPropertyOptional({ example: '150101', description: 'Ubigeo del paciente' })
  @IsOptional()
  @IsString()
  ubigeo?: string;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123', description: 'Dirección del paciente' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ example: 'Soltero', enum: estadoCivil, description: 'Estado civil del paciente' })
  @IsString()
  estado_civil: estadoCivil;

  @ApiProperty({ example: '+51987654321', description: 'Teléfono del paciente', minLength: 9 })
  @IsPhoneNumber('PE')
  telefono: string;

  // @ApiPropertyOptional({ example: 'O+', description: 'Grupo sanguíneo del paciente', pattern: '^(A|B|AB|O)[+-]$' })
  // @Matches(/^(A|B|AB|O)[+-]$/, {
  //   message: 'El grupo sanguíneo debe ser un formato válido (Ejemplo: O+, A-, B+, AB-).',
  // })
  // grupo_sanguineo?: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del paciente' })
  @IsString()
  password: string;
}
