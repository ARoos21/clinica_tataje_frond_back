import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicioReniecDto {
  @ApiProperty({
    example: '12345678',
    description: 'Número de documento nacional de identidad (DNI)',
    minLength: 8,
    maxLength: 8,
  })
  @IsString()
  @Length(8, 8, {
    message: 'El número de documento debe tener exactamente 8 caracteres',
  })
  document_number: string;
}
