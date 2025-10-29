import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Rol } from '../enums/roles.enum';
import { Medico } from 'src/modules/medicos/entities/medico.entity';

@Entity('personal_clinico')
export class PersonalClinico {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id_personal: number;

  @ApiProperty({
    example: '12345678',
    description: 'DNI del personal',
    maxLength: 8,
    uniqueItems: true,
  })
  @Column({ length: 8, unique: true })
  dni: string;

  @ApiProperty({ example: 'Luis', maxLength: 50 })
  @Column({ length: 50 })
  nombres: string;

  @ApiProperty({ example: 'Guerra', maxLength: 50 })
  @Column({ length: 50 })
  apellido_paterno: string;

  @ApiProperty({ example: 'Perez', maxLength: 50 })
  @Column({ length: 50 })
  apellido_materno: string;

  @ApiProperty({
    example: '1990-01-01',
    type: String,
    format: 'date',
    required: false,
  })
  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @ApiProperty({ example: '150101' })
  @Column()
  ubigeo: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección del personal clínico',
  })
  @Column({ length: 100 })
  direccion: string;

  @ApiProperty({ enum: ['Masculino', 'Femenino'] })
  @Column({ type: 'enum', enum: ['Masculino', 'Femenino'] })
  genero: 'Masculino' | 'Femenino';

  @ApiProperty({
    example: 'correo@ejemplo.com',
    maxLength: 100,
    uniqueItems: true,
  })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({ enum: Rol })
  @Column({ name: 'roles', type: 'enum', enum: Rol })
  rol: Rol;

  @ApiProperty({ example: 'hashedpassword', maxLength: 255 })
  @Column({ length: 255 })
  password: string;

  @ApiProperty({
    example: '2024-06-01T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;

  @ApiProperty({ type: () => [Medico], required: false })
  @OneToMany(() => Medico, (medico) => medico.id_personal)
  medico: Medico[];
}
