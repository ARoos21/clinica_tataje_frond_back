import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Especialidades } from '../../especialidades/entities/especialidades.entity';
import { PersonalClinico } from '../../personal_clinico/entities/personal_clinico.entity';
import { Cita } from 'src/modules/citas/entities/cita.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('medicos')
export class Medico {
  @ApiProperty({ example: 1, description: 'ID único del médico' })
  @PrimaryGeneratedColumn()
  id_medico: number;

  @ApiProperty({ type: () => PersonalClinico, description: 'Personal clínico asociado' })
  @ManyToOne(() => PersonalClinico, { eager: true })
  @JoinColumn({ name: 'id_personal' })
  id_personal: PersonalClinico;

  @ApiProperty({ type: () => Especialidades, description: 'Especialidad del médico' })
  @ManyToOne(() => Especialidades, { eager: true })
  @JoinColumn({ name: 'id_especialidad' })
  id_especialidad: Especialidades;

  @ApiProperty({ type: () => [Cita], description: 'Citas asociadas al médico', required: false })
  @OneToMany(() => Cita, (cita) => cita.id_medico)
  citas: Cita[];
}
