import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { BuscarCitaPacienteDto } from './dto/buscar-cita-paciente.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';
import { PacienteUserReq } from '../personal_clinico/user-request.Req';

@ApiTags('Citas')
@ApiBearerAuth()
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post('paciente')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Paciente crea una cita médica' })
  @ApiBody({ type: CreateCitaDto, description: 'Datos para crear la cita' })
  @ApiResponse({ status: 201, description: 'Cita creada exitosamente' })
  async createPaciente(
    @Request() req: PacienteUserReq,
    @Body() createCitaDto: CreateCitaDto,
  ) {
    const id = req.user.id_paciente;
    return await this.citasService.createXPaciente(id, createCitaDto);
  }

  @Post('personal')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Personal clínico crea una cita médica' })
  @ApiBody({ type: CreateCitaDto, description: 'Datos para crear la cita por personal' })
  @ApiResponse({ status: 201, description: 'Cita creada por personal exitosamente' })
  async createPersonal(@Body() createCitaDto: CreateCitaDto) {
    return await this.citasService.createXPersonal(createCitaDto);
  }

  @Get('paciente')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtener todas las citas del paciente autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de citas del paciente' })
  async findAllPaciente(@Request() req: PacienteUserReq) {
    const id = req.user.id_paciente;
    return await this.citasService.findAllPaciente(id);
  }

  @Post('personal/paciente')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Buscar citas por ID de paciente (solo personal)' })
  @ApiBody({ type: BuscarCitaPacienteDto, description: 'ID del paciente para buscar citas' })
  @ApiResponse({ status: 200, description: 'Lista de citas del paciente' })
  async buscarPacienteID(@Body() dto: BuscarCitaPacienteDto) {
    return await this.citasService.buscarCitasDelPaciente(dto);
  }

  @Get('personal')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Obtener todas las citas registradas (solo personal)' })
  @ApiResponse({ status: 200, description: 'Lista completa de citas' })
  async findAllPersonal() {
    return await this.citasService.findAllPersonal();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Obtener los detalles de una cita por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita' })
  @ApiResponse({ status: 200, description: 'Cita encontrada' })
  async findOne(@Param('id') id: number) {
    return await this.citasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Reprogramar una cita existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita a reprogramar' })
  @ApiBody({ type: UpdateCitaDto, description: 'Datos para reprogramar la cita' })
  @ApiResponse({ status: 200, description: 'Cita reprogramada correctamente' })
  async ReprogramarCita(
    @Param('id') id: number,
    @Body() updateCitaDto: UpdateCitaDto,
  ) {
    return await this.citasService.ReprogramarCita(id, updateCitaDto);
  }

  @Patch('estado/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Cambiar el estado de una cita' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la cita' })
  @ApiBody({ type: UpdateCitaDto, description: 'Nuevo estado de la cita' })
  @ApiResponse({ status: 200, description: 'Estado actualizado exitosamente' })
  async CambiarEstadoCita(
    @Param('id') id: number,
    @Body() updatedto: UpdateCitaDto,
  ) {
    return await this.citasService.cambioEstadoCita(id, {
      estado: updatedto.estado,
    });
  }

  @Get('personal/canceladas')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Listar todas las citas canceladas' })
  @ApiResponse({ status: 200, description: 'Citas canceladas listadas exitosamente' })
  async findAllCitasCanceladas() {
    return await this.citasService.findCitasCanceladas();
  }
}
