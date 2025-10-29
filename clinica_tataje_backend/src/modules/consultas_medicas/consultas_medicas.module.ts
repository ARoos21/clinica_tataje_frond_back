import { Module } from '@nestjs/common';
import { ConsultasMedicasService } from './consultas_medicas.service';
import { ConsultasMedicasController } from './consultas_medicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasMedica } from './entities/consultas_medica.entity';
import { Cita } from '../citas/entities/cita.entity';
import { HistoriaMedicaModule } from '../historia_medica/historia_medica.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultasMedica, Cita]),
    HistoriaMedicaModule,
  ],
  controllers: [ConsultasMedicasController],
  providers: [ConsultasMedicasService],
})
export class ConsultasMedicasModule {}
