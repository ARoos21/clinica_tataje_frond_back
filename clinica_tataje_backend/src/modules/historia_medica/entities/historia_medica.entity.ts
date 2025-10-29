import { ConsultasMedica } from 'src/modules/consultas_medicas/entities/consultas_medica.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('historia_medica')
export class HistoriaMedica {
  @PrimaryGeneratedColumn({ name: 'id_historia' })
  id_historia: number;

  @Column({ name: 'id_paciente' })
  id_paciente: number;

  @Column({
    type: 'datetime',
    name: 'fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_creacion: Date;

  @OneToMany(() => ConsultasMedica, (consultaMedica) => consultaMedica.historia)
  consultas: ConsultasMedica[];
}
