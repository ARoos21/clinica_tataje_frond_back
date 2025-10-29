import { Module } from '@nestjs/common';
import { HistoriaMedicaService } from './historia_medica.service';
import { HistoriaMedicaController } from './historia_medica.controller';
import { HistoriaMedica } from './entities/historia_medica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasMedica } from '../consultas_medicas/entities/consultas_medica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaMedica, ConsultasMedica])],
  controllers: [HistoriaMedicaController],
  providers: [HistoriaMedicaService],
  exports: [HistoriaMedicaService],
})
export class HistoriaMedicaModule {}
