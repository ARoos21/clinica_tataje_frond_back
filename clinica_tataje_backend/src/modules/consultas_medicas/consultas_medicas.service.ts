import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConsultasMedicaDto } from './dto/create-consultas_medica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultasMedica } from './entities/consultas_medica.entity';
import { Repository } from 'typeorm';
import { HistoriaMedicaService } from '../historia_medica/historia_medica.service';
import { EstadoCitaEnum } from '../citas/enum/estado-cita.enum';
import { Cita } from '../citas/entities/cita.entity';
import { ConsultaMedicaResponseDto } from './dto/consulta-medica-response.dto';
@Injectable()
export class ConsultasMedicasService {
  constructor(
    @InjectRepository(ConsultasMedica)
    private readonly consultaRepo: Repository<ConsultasMedica>,
    private readonly historiaService: HistoriaMedicaService,

    @InjectRepository(Cita)
    private readonly citaRepo: Repository<Cita>,
  ) {}

  private mapToResponse(consulta: ConsultasMedica): ConsultaMedicaResponseDto {
    return {
      id_consulta: consulta.id_consulta,
      historia: {
        id_historia: consulta.historia.id_historia,
        id_paciente: consulta.historia.id_paciente,
        fecha_creacion: consulta.historia.fecha_creacion,
      },
      cita: {
        id_cita: consulta.cita.id_cita,
        id_paciente: {
          id_paciente: consulta.cita.id_paciente.id_paciente,
          dni: consulta.cita.id_paciente.dni,
          nombres: consulta.cita.id_paciente.nombres,
          apellido_paterno: consulta.cita.id_paciente.apellido_paterno,
          apellido_materno: consulta.cita.id_paciente.apellido_materno,
        },
        id_medico: {
          id_medico: consulta.cita.id_medico.id_medico,
          id_personal: {
            id_personal: consulta.cita.id_medico.id_personal.id_personal,
            dni: consulta.cita.id_medico.id_personal.dni,
            nombres: consulta.cita.id_medico.id_personal.nombres,
            apellido_paterno:
              consulta.cita.id_medico.id_personal.apellido_paterno,
          },
          id_especialidad: {
            id_especialidad:
              consulta.cita.id_medico.id_especialidad.id_especialidad,
            nombre: consulta.cita.id_medico.id_especialidad.nombre,
          },
        },

        motivo: consulta.cita.motivo,
        estado: consulta.cita.estado,
      },
      fecha_consulta: consulta.fecha_consulta,
      diagnostico: consulta.diagnostico,
      tratamiento: consulta.tratamiento,
      observaciones: consulta.observaciones,
    };
  }

  async crearConsulta(
    dto: CreateConsultasMedicaDto,
  ): Promise<ConsultaMedicaResponseDto> {
    const cita = await this.citaRepo.findOne({
      where: { id_cita: dto.citaId },
      relations: [
        'id_paciente',
        'id_medico',
        'id_medico.id_personal',
        'id_medico.id_especialidad',
      ],
    });

    if (!cita) throw new NotFoundException('La cita no existe');

    if (cita.estado !== EstadoCitaEnum.PROGRAMADA) {
      throw new BadRequestException(
        'Solo se pueden registrar consultas de citas programadas',
      );
    }

    const historia = await this.historiaService.crearHistoriaSiNoExiste(
      cita.id_paciente.id_paciente,
    );

    const consulta = this.consultaRepo.create({
      historia: historia,
      cita: cita,
      diagnostico: dto.diagnostico,
      tratamiento: dto.tratamiento,
      observaciones: dto.observaciones,
      fecha_consulta: new Date()
    });

    const nuevaConsulta = await this.consultaRepo.save(consulta);

    // Cambiar estado de cita a REALIZADA
    await this.citaRepo.update(cita.id_cita, {
      estado: EstadoCitaEnum.REALIZADA,
    });

    // Buscar la consulta ya guardada con relaciones necesarias
    const consultaGuardada = await this.consultaRepo.findOne({
      where: { id_consulta: nuevaConsulta.id_consulta },
      relations: [
        'historia',
        'cita',
        'cita.id_paciente',
        'cita.id_medico',
        'cita.id_medico.id_personal',
        'cita.id_medico.id_especialidad',
      ],
    });

    return this.mapToResponse(consultaGuardada);
  }
}
