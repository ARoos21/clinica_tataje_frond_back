import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { Medico } from './entities/medico.entity';
import { PersonalClinico } from '../personal_clinico/entities/personal_clinico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidades } from '../especialidades/entities/especialidades.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medico, PersonalClinico, Especialidades]),
  ],

  controllers: [MedicosController],
  providers: [MedicosService],
})
export class MedicosModule {}
