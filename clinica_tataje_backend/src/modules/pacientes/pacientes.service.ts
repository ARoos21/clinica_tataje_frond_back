import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<Paciente> {
    if (createPacienteDto.dni) {
      const dniExisting = await this.pacienteRepo.findOne({
        where: { dni: createPacienteDto.dni },
      });
      if (dniExisting) {
        throw new BadRequestException('El DNI ya esta registrado');
      }
    }

    const hashPassword = await bcrypt.hash(createPacienteDto.password, 10);

    const newPaciente = await this.pacienteRepo.create({
      ...createPacienteDto,
      password: hashPassword,
    });
    return await this.pacienteRepo.save(newPaciente);
  }
  async cambiarContrasena(
    id_paciente: number,
    passwordActual: string,
    nuevaContrasena: string,
  ): Promise<{ message: string }> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
      select: { id_paciente: true, password: true },
    });

    if (!paciente) {
      throw new BadRequestException('El paciente no existe');
    }

    const passwordValido = await bcrypt.compare(
      passwordActual,
      paciente.password,
    );
    if (!passwordValido) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    const nuevaPasswordHash = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizamos usando preload + save para mantener validaciones y hooks si los hubiera
    const pacienteActualizado = await this.pacienteRepo.preload({
      id_paciente,
      password: nuevaPasswordHash,
    });

    if (!pacienteActualizado) {
      throw new BadRequestException('Error al actualizar la contraseña');
    }

    await this.pacienteRepo.save(pacienteActualizado);
    return { message: 'Contraseña actualizada exitosamente' };
  }

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepo.find({
      select: {
        id_paciente: true,
        dni: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        fecha_nacimiento: true,
        ubigeo: true,
        direccion: true,
        telefono: true,
        genero: true,
      },
    });
  }

  async findOne(id_paciente: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
      select: {
        id_paciente: true,
        dni: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        fecha_nacimiento: true,
        ubigeo: true,
        direccion: true,
        telefono: true,
        genero: true,
      },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no existente');
    }
    return paciente;
  }

  async misDatos(id_paciente: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
      select: {
        id_paciente: true,
        dni: true,
        nombres: true,
        apellido_paterno: true,
        apellido_materno: true,
        fecha_nacimiento: true,
        ubigeo: true,
        direccion: true,
        telefono: true,
        genero: true,
        estado_civil: true,
      },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no existente');
    }
    return paciente;
  }

  async cambioCelladnECivil(
    id_paciente: number,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
    });
    if (!paciente) {
      throw new BadRequestException('Paciente no existente');
    }
    await this.pacienteRepo.update(id_paciente, updatePacienteDto);

    const updatedPaciente = await this.pacienteRepo.findOne({
      where: { id_paciente },
      select: { id_paciente: true, telefono: true, estado_civil: true },
    });

    return updatedPaciente;
  }
}
