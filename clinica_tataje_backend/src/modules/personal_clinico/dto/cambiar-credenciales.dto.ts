import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CambiarCredencialesDto {
  @ApiProperty({ example: 'usuario@ejemplo.com', description: 'Correo electrónico actual' })
  @IsEmail()
  emailActual: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña actual' })
  @IsString()
  passwordActual: string;

  @ApiPropertyOptional({ example: 'nuevo@ejemplo.com', description: 'Nuevo correo electrónico (opcional)' })
  @IsOptional()
  @IsEmail()
  emailNuevo?: string;

  @ApiPropertyOptional({ example: 'nuevaPassword456', description: 'Nueva contraseña (opcional, mínimo 6 caracteres)' })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  passwordNuevo?: string;
}
