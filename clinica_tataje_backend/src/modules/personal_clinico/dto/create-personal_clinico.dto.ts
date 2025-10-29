import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Rol } from '../enums/roles.enum';

export class CreatePersonalClinicoDto {
  @ApiProperty({
    example: '12345678',
    description: 'DNI del personal clínico',
    minLength: 8,
    maxLength: 8,
  })
  @IsNotEmpty()
  @Length(8, 8)
  dni: string;

  @ApiProperty({ example: 'Luis', description: 'Nombres del personal clínico' })
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty({ example: 'Guerra', description: 'Apellido paterno' })
  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido materno' })
  @IsNotEmpty()
  @IsString()
  apellido_materno: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento',
    type: String,
    format: 'date',
  })
  @IsNotEmpty()
  @IsDate()
  fecha_nacimiento: Date;

  @ApiProperty({
    example: 'Masculino',
    enum: ['Masculino', 'Femenino'],
    description: 'Género',
  })
  @IsNotEmpty()
  @IsEnum(['Masculino', 'Femenino'])
  genero: 'Masculino' | 'Femenino';

  @ApiPropertyOptional({ example: '150101', description: 'Código de ubigeo' })
  @IsOptional()
  ubigeo: string;

  @IsOptional()
  direccion: string;

  @ApiProperty({
    example: 'correo@ejemplo.com',
    description: 'Correo electrónico',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: Rol.MEDICO,
    enum: Rol,
    description: 'Rol del personal clínico',
  })
  @IsEnum(Rol, { message: 'Rol no válido' })
  rol: Rol;
}
