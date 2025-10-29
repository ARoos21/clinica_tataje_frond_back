import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriaMedicaDto } from './create-historia_medica.dto';

export class UpdateHistoriaMedicaDto extends PartialType(CreateHistoriaMedicaDto) {}
