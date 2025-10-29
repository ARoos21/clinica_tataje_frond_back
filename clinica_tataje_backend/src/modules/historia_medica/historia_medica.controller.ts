import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { HistoriaMedicaService } from './historia_medica.service';
import { AuthGuard } from '@nestjs/passport';
import { PacienteUserReq } from '../personal_clinico/user-request.Req';
import { BuscarCitaPacienteDto } from '../citas/dto/buscar-cita-paciente.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from '../personal_clinico/enums/roles.enum';

@Controller('historia-medica')
export class HistoriaMedicaController {
  constructor(private readonly historiaMedicaService: HistoriaMedicaService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get('paciente')
  async getHistorialPaciente(@Request() req: PacienteUserReq) {
    const idpa = req.user.id_paciente;
    try {
      return await this.historiaMedicaService.obtenerHistorialDePaciente(idpa);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.SECRETARIA)
  @Post('buscar')
  async getHistorialDelPacienteID(@Body() dto: BuscarCitaPacienteDto) {
    try {
      return await this.historiaMedicaService.obtenerHistorialpacienteID(dto);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}
