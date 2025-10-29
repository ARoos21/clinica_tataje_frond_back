import { IsNotEmpty, IsString } from 'class-validator';

export class CrearEspecialidadDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
