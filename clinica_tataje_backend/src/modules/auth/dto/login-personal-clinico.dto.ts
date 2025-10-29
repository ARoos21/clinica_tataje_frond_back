import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPersonalClinicoDto {
  @ApiProperty({
    example: 'medico@clinica.com',
    description: 'Correo electrónico del personal clínico',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del personal clínico',
  })
  @IsString()
  password: string;
}
