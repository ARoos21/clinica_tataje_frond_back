import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especialidades')
export class Especialidades {
  @PrimaryGeneratedColumn()
  id_especialidad: number;

  @Column() nombre: string;

  @Column({ type: 'text' }) descripcion: string;

  @Column({ type: 'longtext' }) imagen: string;

  @OneToMany(() => Medico, (medico) => medico.id_especialidad)
  medicos: Medico[];
}
