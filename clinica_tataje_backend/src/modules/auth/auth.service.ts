import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalClinico } from '../personal_clinico/entities/personal_clinico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { LoginPacienteDto } from './dto/login-paciente.dto';
import { LoginPersonalClinicoDto } from './dto/login-personal-clinico.dto';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PersonalClinico)
    private personalRepo: Repository<PersonalClinico>,

    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,

    private jwtService: JwtService,
  ) {}

  // Corregimos el DTO y la desestructuración del login
  async loginPersonal(dtoLogin: LoginPersonalClinicoDto) {
    const { email, password } = dtoLogin;

    // Buscar el usuario por el correo
    const user = await this.personalRepo.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id_personal,
      name: user.nombres,
      rol: user.rol,
    };

    // Obtenemos la expiración desde el entorno o se asigna un valor predeterminado
    const expiresIn = process.env.JWT_EXPIRES_IN; // Usamos un valor por defecto '1h' si no está definido en .env
    const token = this.jwtService.sign(payload, { expiresIn });
    return {
      access_token: token,
      token_expiration: new Date(Date.now() + ms(expiresIn)).toISOString(), // Si deseas mostrar la expiración exacta
    };
  }

  // Para el login de pacientes, seguimos la misma estructura
  async loginPaciente(dtoLogin: LoginPacienteDto) {
  const { dni, password } = dtoLogin;

  // 1. Buscar paciente incluyendo la contraseña
  const user = await this.pacienteRepo.findOne({
    where: { dni },
    select: { id_paciente: true, dni: true, nombres: true, password: true },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  // 2. Generar token JWT
  const payload = {
    sub: user.id_paciente,
    dni: user.dni,
    name: user.nombres,
    rol: 'paciente',
  };

  const expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';
  const token = this.jwtService.sign(payload, { expiresIn });

  const decoded: any = this.jwtService.decode(token);
  const token_expiration = decoded?.exp
    ? new Date(decoded.exp * 1000).toISOString()
    : undefined;

  // 3. Devolver el token
  return { access_token: token, token_expiration };

  }
}
