import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { PersonalClinico } from '../personal_clinico/entities/personal_clinico.entity';
import { Especialidades } from '../especialidades/entities/especialidades.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cita,
      Medico,
      PersonalClinico,
      Paciente,
      Especialidades,
    ]),
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
