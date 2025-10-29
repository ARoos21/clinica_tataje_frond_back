import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalClinicoDto } from './create-personal_clinico.dto';

export class UpdatePersonalClinicoDto extends PartialType(CreatePersonalClinicoDto) {}
