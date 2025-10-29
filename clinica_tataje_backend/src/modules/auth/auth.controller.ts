import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginPersonalClinicoDto } from './dto/login-personal-clinico.dto';
import { LoginPacienteDto } from './dto/login-paciente.dto';

@ApiTags('autenticacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/personal-clinico')
  @ApiOperation({ summary: 'Iniciar sesión como personal clínico' })
  @ApiBody({ type: LoginPersonalClinicoDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async loginPersonal(@Body() dtoPersonal: LoginPersonalClinicoDto) {
    try {
      return await this.authService.loginPersonal(dtoPersonal);
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || 'Credenciales inválidas');
    }
  }

  @Post('login/paciente')
  @ApiOperation({ summary: 'Iniciar sesión como paciente' })
  @ApiBody({ type: LoginPacienteDto })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async loginPaciente(@Body() dtoPaciente: LoginPacienteDto) {
    try {
      return await this.authService.loginPaciente(dtoPaciente);
    } catch (error: any) {
      throw new UnauthorizedException(error?.message || 'Credenciales inválidas');
    }
  }
}
