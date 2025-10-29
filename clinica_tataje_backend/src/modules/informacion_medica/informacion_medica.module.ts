import { Module } from '@nestjs/common';
import { InformacionMedicaService } from './informacion_medica.service';
import { InformacionMedicaController } from './informacion_medica.controller';

@Module({
  controllers: [InformacionMedicaController],
  providers: [InformacionMedicaService],
})
export class InformacionMedicaModule {}
