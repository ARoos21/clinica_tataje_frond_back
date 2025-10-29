import { Cita } from 'src/modules/citas/entities/cita.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum estadoCivil {
  DIVORCIADO = 'DIVORCIADO',
  CASADO = 'CASADO',
  VIUDO = 'VIUDO',
  SOLTERO = 'SOLTERO',
}

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id_paciente: number;

  @Column({ length: 8, unique: true })
  dni: string;

  @Column({ length: 50 })
  nombres: string;

  @Column({ length: 50 })
  apellido_paterno: string;

  @Column({ length: 50 })
  apellido_materno: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino'] })
  genero: 'Masculino' | 'Femenino';

  @Column({ length: 50 })
  ubigeo: string;

  @Column()
  direccion: string;

  @Column({ type: 'enum', enum: estadoCivil })
  estado_civil: estadoCivil;

  @Column()
  telefono: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @OneToMany(() => Cita, (cita) => cita.id_paciente)
  citas: Cita[];
}
