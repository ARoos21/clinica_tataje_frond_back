import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';
import { PacienteUserReq } from '../personal_clinico/user-request.Req';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Pacientes')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    try {
      return this.pacientesService.create(createPacienteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get()
  findAll() {
    try {
      return this.pacientesService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado.' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  findOne(@Param('id') id_paciente: number) {
    try {
      return this.pacientesService.findOne(id_paciente);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('misDatos')
  misDatos(@Request() req: PacienteUserReq) {
    const id = req.user.id_paciente;
    try {
      return this.pacientesService.misDatos(id);
    } catch (error) {}
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar celular y estado civil del paciente autenticado',
  })
  @ApiResponse({ status: 200, description: 'Paciente actualizado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @Patch('cell-estado')
  @UseGuards(AuthGuard('jwt'))
  camnioCellECivil(
    @Request() req: PacienteUserReq,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    const id = req.user.id_paciente;
    try {
      return this.pacientesService.cambioCelladnECivil(id, updatePacienteDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch('cambio')
  @UseGuards(AuthGuard('jwt'))
  cambioPassword(
    @Request() req: PacienteUserReq,
    @Body() body: { passwordActual: string; nuevaContrasena: string },
  ) {
    const id = req.user.id_paciente;
    const { passwordActual, nuevaContrasena } = body;
    try {
      return this.pacientesService.cambiarContrasena(
        id,
        passwordActual,
        nuevaContrasena,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
