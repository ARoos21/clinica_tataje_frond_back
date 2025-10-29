import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HistoriaMedica } from 'src/modules/historia_medica/entities/historia_medica.entity';
import { Cita } from 'src/modules/citas/entities/cita.entity';

@Entity('consultas_medicas')
export class ConsultasMedica {
  @PrimaryGeneratedColumn({ name: 'id_consulta' })
  id_consulta: number;

  @ManyToOne(() => HistoriaMedica, (historia) => historia.consultas, {
    eager: true,
  })
  @JoinColumn({ name: 'id_historia' })
  historia: HistoriaMedica;

  @ManyToOne(() => Cita, (cita) => cita.consultas, { eager: true })
  @JoinColumn({ name: 'id_cita' })
  cita: Cita;

  @Column({ type: 'date', name: 'fecha_consulta', default: () => 'CURRENT_TIMESTAMP' })
  fecha_consulta: Date;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({ type: 'text' })
  tratamiento: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;
}
