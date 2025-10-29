import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { Rol } from '../personal_clinico/enums/roles.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Medico } from './entities/medico.entity';

// DTOs para respuestas Swagger
class MedicoResponse {
  message: string;
  data: Medico;
}
class MedicosListResponse {
  message: string;
  data: Medico[];
}
class MessageResponse {
  message: string;
}

@ApiTags('Medicos')
@ApiBearerAuth()
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  @ApiOperation({ summary: 'Crear un médico' })
  @ApiCreatedResponse({ description: 'Médico creado', type: MedicoResponse })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async crear(@Body() dto: CreateMedicoDto) {
    try {
      const medico = await this.medicosService.create(dto);
      return { message: 'Médico creado exitosamente', data: medico };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  @ApiOperation({ summary: 'Actualizar un médico' })
  @ApiOkResponse({ description: 'Médico actualizado', type: MedicoResponse })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async update(@Param('id') id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
    try {
      const medico = await this.medicosService.update(id, updateMedicoDto);
      return { message: 'Médico actualizado exitosamente', data: medico };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un médico por ID' })
  @ApiOkResponse({ description: 'Médico encontrado', type: MedicoResponse })
  @ApiNotFoundResponse({ description: 'Médico no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findOne(@Param('id') id: number) {
    try {
      const medico = await this.medicosService.findOne(id);
      return { message: 'Médico encontrado', data: medico };
    } catch (error) { 
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los médicos' })
  @ApiOkResponse({ description: 'Lista de médicos', type: MedicosListResponse })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll() {
    try {
      const medicos = await this.medicosService.findAll();
      return { message: 'Lista de médicos', data: medicos };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.SUPERADMINISTRADOR, Rol.ADMINISTRADOR)
  @ApiOperation({ summary: 'Eliminar un médico' })
  @ApiOkResponse({ description: 'Médico eliminado', type: MessageResponse })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async delete(@Param('id') id: number) {
    try {
      await this.medicosService.delete(id);
      return { message: 'Médico eliminado exitosamente' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
