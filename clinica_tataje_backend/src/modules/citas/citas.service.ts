import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { Medico } from '../medicos/entities/medico.entity';
import { CitaResponseDto } from './dto/response-cita.dto';
import { EstadoCitaEnum } from './enum/estado-cita.enum';
import { BuscarCitaPacienteDto } from './dto/buscar-cita-paciente.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepo: Repository<Cita>,
    @InjectRepository(Paciente)
    private readonly personaRepo: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepo: Repository<Medico>,
  ) {}

  private mapToCitaResponse(cita: Cita): CitaResponseDto {
    return {
      id_cita: cita.id_cita,
      fecha: cita.fecha instanceof Date ? cita.fecha.toISOString() : cita.fecha,
      hora: cita.hora,
      motivo: cita.motivo,
      estado: cita.estado,
      id_paciente: {
        id_paciente: cita.id_paciente.id_paciente,
        dni: cita.id_paciente.dni,
        nombres: cita.id_paciente.nombres,
        apellido_paterno: cita.id_paciente.apellido_paterno,
        apellido_materno: cita.id_paciente.apellido_materno,
        telefono: cita.id_paciente.telefono,
      },
      id_medico: {
        id_medico: cita.id_medico.id_medico,
        id_personal: {
          id_personal: cita.id_medico.id_personal.id_personal,
          nombres: cita.id_medico.id_personal.nombres,
          apellido_paterno: cita.id_medico.id_personal.apellido_paterno,
        },
        id_especialidad: {
          id_especialidad: cita.id_medico.id_especialidad.id_especialidad,
          nombre: cita.id_medico.id_especialidad.nombre,
        },
      },
    };
  }

  private async validarRestriccionesDeCita(
    createCitaDto: CreateCitaDto,
  ): Promise<void> {
    const { id_paciente, fecha, hora } = createCitaDto;

    const fechaValida = new Date(`${fecha}T00:00:00`);
    if (isNaN(fechaValida.getTime())) {
      throw new BadRequestException('Fecha inválida');
    }

    const fechaHoraNueva = new Date(`${fecha}T${hora}`);
    if (isNaN(fechaHoraNueva.getTime())) {
      throw new BadRequestException('Hora inválida');
    }

    // Máximo 3 citas en el mismo día
    const citasDelDia = await this.citaRepo
      .createQueryBuilder('cita')
      .leftJoin('cita.id_paciente', 'paciente')
      .where('paciente.id_paciente = :id_paciente', { id_paciente })
      .andWhere('cita.fecha = :fecha', { fecha })
      .getMany();

    if (citasDelDia.length >= 3) {
      throw new BadRequestException(
        'Ya existen 3 citas registradas para el paciente en esa fecha',
      );
    }

    // Validar diferencia de al menos 4 horas entre citas
    for (const cita of citasDelDia) {
      const fechaExistente = new Date(`${fecha}T${cita.hora}`);
      if (isNaN(fechaExistente.getTime())) continue;

      const diffHoras = Math.abs(
        (fechaHoraNueva.getTime() - fechaExistente.getTime()) /
          (1000 * 60 * 60),
      );

      if (diffHoras < 4) {
        throw new BadRequestException(
          `Debe haber al menos 4 horas de diferencia con la cita a las ${cita.hora}`,
        );
      }
    }

    // Máximo 3 citas programadas activas
    const citasProgramadas = await this.citaRepo
      .createQueryBuilder('cita')
      .leftJoin('cita.id_paciente', 'paciente')
      .where('paciente.id_paciente = :id_paciente', { id_paciente })
      .andWhere('cita.estado = :estado', {
        estado: EstadoCitaEnum.PROGRAMADA,
      })
      .getCount();

    if (citasProgramadas > 3) {
      throw new BadRequestException(
        'El paciente no puede tener más de 3 citas programadas activas',
      );
    }
  }

  async createXPaciente(
    id_paciente: number,
    createCitaDto: CreateCitaDto,
  ): Promise<CitaResponseDto> {
    const paciente = await this.personaRepo.findOne({ where: { id_paciente } });
    if (!paciente) throw new NotFoundException('El paciente no existe');

    const medico = await this.medicoRepo.findOne({
      where: { id_medico: createCitaDto.id_medico },
      relations: ['id_personal', 'id_especialidad'],
    });
    if (!medico) throw new NotFoundException('El médico no existe');

    // Validar reglas de negocio
    await this.validarRestriccionesDeCita({ ...createCitaDto, id_paciente });

    const nuevaCita = this.citaRepo.create({
      ...createCitaDto,
      id_paciente: paciente,
      id_medico: medico,
    });

    const citaGuardada = await this.citaRepo.save(nuevaCita);
    return this.mapToCitaResponse(citaGuardada);
  }

  async createXPersonal(
    createCitaDto: CreateCitaDto,
  ): Promise<CitaResponseDto> {
    const paciente = await this.personaRepo.findOne({
      where: { id_paciente: createCitaDto.id_paciente },
    });
    if (!paciente) throw new NotFoundException('El paciente no existe');

    const medico = await this.medicoRepo.findOne({
      where: { id_medico: createCitaDto.id_medico },
      relations: ['id_personal', 'id_especialidad'],
    });
    if (!medico) throw new NotFoundException('El médico no existe');

    // Validar reglas de negocio
    await this.validarRestriccionesDeCita(createCitaDto);

    const nuevaCita = this.citaRepo.create({
      ...createCitaDto,
      id_paciente: paciente,
      id_medico: medico,
    });

    const citaGuardada = await this.citaRepo.save(nuevaCita);
    return this.mapToCitaResponse(citaGuardada);
  }
  async findAllPaciente(
    id_pacienteClinico: number,
  ): Promise<CitaResponseDto[]> {
    const citas = await this.citaRepo
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.id_paciente', 'paciente')
      .leftJoinAndSelect('cita.id_medico', 'medico')
      .leftJoinAndSelect('medico.id_personal', 'personal')
      .leftJoinAndSelect('medico.id_especialidad', 'especialidad')
      .where('cita.id_paciente = :id', { id: id_pacienteClinico })
      .getMany();

    return citas.map((cita) => this.mapToCitaResponse(cita));
  }

    async buscarCitasDelPaciente(
      dto: BuscarCitaPacienteDto,
    ): Promise<CitaResponseDto[]> {
      const citas = await this.citaRepo
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.id_paciente', 'paciente')
        .leftJoinAndSelect('cita.id_medico', 'medico')
        .leftJoinAndSelect('medico.id_personal', 'personal')
        .leftJoinAndSelect('medico.id_especialidad', 'especialidad')
        .where('cita.id_paciente = :id', { id: dto.id_paciente })
        .getMany();

      return citas.map((cita) => this.mapToCitaResponse(cita));
    }

  async findAllPersonal(): Promise<CitaResponseDto[]> {
    const citas = await this.citaRepo
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.id_paciente', 'paciente')
      .leftJoinAndSelect('cita.id_medico', 'medico')
      .leftJoinAndSelect('medico.id_personal', 'personal')
      .leftJoinAndSelect('medico.id_especialidad', 'especialidad')
      .getMany();

    return citas.map((cita) => this.mapToCitaResponse(cita));
  }

  //Esto es para el personal clinico
  async findOne(id_cita: number): Promise<CitaResponseDto> {
    const cita = await this.citaRepo.findOne({
      where: { id_cita },
      relations: [
        'id_paciente',
        'id_medico',
        'id_medico.id_personal',
        'id_medico.id_especialidad',
      ],
    });
    if (!cita) {
      throw new NotFoundException('La cita no existe');
    }
    return this.mapToCitaResponse(cita);
  }

  async ReprogramarCita(
    id_cita: number,
    updateCitaDto: UpdateCitaDto,
  ): Promise<CitaResponseDto> {
    const cita = await this.citaRepo.findOne({
      where: { id_cita },
      relations: [
        'id_paciente',
        'id_medico',
        'id_medico.id_personal',
        'id_medico.id_especialidad',
      ],
    });

    if (!cita) {
      throw new NotFoundException('La cita no existe');
    }

    // Validar si la cita está cancelada o realizada → no se puede reprogramar
    if (
      cita.estado === EstadoCitaEnum.CANCELADA ||
      cita.estado === EstadoCitaEnum.REALIZADA
    ) {
      throw new BadRequestException(
        `No se puede reprogramar una cita con estado ${cita.estado.toLowerCase()}`,
      );
    }

    const nuevaFecha = updateCitaDto.fecha ?? cita.fecha;
    const nuevaHora = updateCitaDto.hora ?? cita.hora;

    // Validar restricciones con nueva fecha y hora (pasamos id_paciente explícitamente)
    await this.validarRestriccionesDeCita({
      id_paciente: cita.id_paciente.id_paciente,
      id_medico: cita.id_medico.id_medico,
      fecha: nuevaFecha,
      hora: nuevaHora,
      motivo: updateCitaDto.motivo ?? cita.motivo,
      estado: cita.estado, // no se cambia estado en esta operación
    });

    // Aplicar los cambios
    cita.fecha = nuevaFecha;
    cita.hora = nuevaHora;
    if (updateCitaDto.motivo) cita.motivo = updateCitaDto.motivo;

    const citaActualizada = await this.citaRepo.save(cita);
    return this.mapToCitaResponse(citaActualizada);
  }

  async cambioEstadoCita(
    id_cita: number,
    updateEstadoDto: { estado: EstadoCitaEnum },
  ): Promise<CitaResponseDto> {
    const cita = await this.citaRepo.findOne({
      where: { id_cita },
      relations: [
        'id_paciente',
        'id_medico',
        'id_medico.id_personal',
        'id_medico.id_especialidad',
      ],
    });

    if (!cita) {
      throw new NotFoundException('La cita no existe');
    }

    // Solo permitir cambio si la cita está programada
    if (cita.estado !== EstadoCitaEnum.PROGRAMADA) {
      throw new BadRequestException(
        `Solo se puede cambiar el estado de una cita programada`,
      );
    }

    // Solo permitir cambio a REALIZADA o CANCELADA
    if (
      updateEstadoDto.estado !== EstadoCitaEnum.REALIZADA &&
      updateEstadoDto.estado !== EstadoCitaEnum.CANCELADA
    ) {
      throw new BadRequestException(
        'El estado solo puede cambiar a REALIZADA o CANCELADA',
      );
    }

    cita.estado = updateEstadoDto.estado;
    const citaActualizada = await this.citaRepo.save(cita);
    return this.mapToCitaResponse(citaActualizada);
  }

  async findCitasCanceladas(): Promise<CitaResponseDto[]> {
    const citas = await this.citaRepo
      .createQueryBuilder('cita')
      .leftJoinAndSelect('cita.id_paciente', 'paciente')
      .leftJoinAndSelect('cita.id_medico', 'medico')
      .leftJoinAndSelect('medico.id_personal', 'personal')
      .leftJoinAndSelect('medico.id_especialidad', 'especialidad')
      .where('cita.estado = :estado', { estado: EstadoCitaEnum.CANCELADA })
      .getMany();

    return citas.map((cita) => this.mapToCitaResponse(cita));
  }
}
