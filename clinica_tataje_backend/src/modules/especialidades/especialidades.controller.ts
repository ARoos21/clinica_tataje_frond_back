import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrearEspecialidadDto } from './dto/crear-especialidad.dto';
import { UpdateEspacialidadDto } from './dto/update-espacialidad.dto';
import { EspecialidadesService } from './especialidades.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(private readonly especialidadesService: EspecialidadesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  @UseInterceptors(FileInterceptor('imagen'))
  async crear(
    @Body() dto: CrearEspecialidadDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    try {
      return this.especialidadesService.crearEspecialidad(dto, imagen);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  @UseInterceptors(FileInterceptor('imagen'))
  async actualizar(
    @Param('id') id: number,
    @Body() dto: UpdateEspacialidadDto,
    @UploadedFile() imagen?: Express.Multer.File,
  ) {
    try {
      return this.especialidadesService.update(id, dto, imagen);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  async obtenerTodas() {
    try {
      return this.especialidadesService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  async obtenerUna(@Param('id') id: number) {
    try {
      return this.especialidadesService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  async eliminar(@Param('id') id: number) {
    try {
      return this.especialidadesService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
