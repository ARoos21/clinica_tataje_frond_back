import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidades } from './entities/especialidades.entity';
import { CrearEspecialidadDto } from './dto/crear-especialidad.dto';
import { UpdateEspacialidadDto } from './dto/update-espacialidad.dto';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidades)
    private readonly repo: Repository<Especialidades>,
  ) {}

  async crearEspecialidad(
    dto: CrearEspecialidadDto,
    imagen: Express.Multer.File,
  ): Promise<Especialidades> {
    const base64Imagen = imagen.buffer.toString('base64');

    const especialidad = this.repo.create({
      ...dto,
      imagen: base64Imagen,
    });

    return await this.repo.save(especialidad);
  }

  async update(
    id_especialidad: number,
    dto: UpdateEspacialidadDto,
    imagen?: Express.Multer.File,
  ): Promise<Especialidades> {
    const especialidad = await this.repo.findOne({
      where: { id_especialidad },
    });

    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }

    // Combinar datos del DTO
    Object.assign(especialidad, dto);

    // Si se proporciona una nueva imagen
    if (imagen) {
      const base64Imagen = imagen.buffer.toString('base64');
      especialidad.imagen = base64Imagen;
    }

    return await this.repo.save(especialidad);
  }

  async findOne(id_especialidad: number): Promise<Especialidades> {
    const especialidad = await this.repo.findOne({
      where: { id_especialidad },
    });
    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }
    return especialidad;
  }

  async findAll(): Promise<Especialidades[]> {
    return await this.repo.find();
  }

async delete(id_especialidad: number): Promise<{ message: string }> {
    const especialidad = await this.repo.findOne({
        where: { id_especialidad },
    });

    if (!especialidad) {
        throw new NotFoundException('Especialidad no encontrada');
    }

    await this.repo.remove(especialidad);
    return { message: 'Especialidad eliminada correctamente' };
}
}
