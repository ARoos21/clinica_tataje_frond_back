import { Controller } from '@nestjs/common';
import { InformacionMedicaService } from './informacion_medica.service';

@Controller('informacion-medica')
export class InformacionMedicaController {
  constructor(private readonly informacionMedicaService: InformacionMedicaService) {}
}
