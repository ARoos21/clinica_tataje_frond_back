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

async loginPersonal(dtoLogin: LoginPersonalClinicoDto) {
  const email = String(dtoLogin.email ?? '').trim().toLowerCase();
  const password = String(dtoLogin.password ?? '');

  // 🔥 IMPORTANTE: incluir el campo password en el select
  const user = await this.personalRepo.findOne({
    
    where: { email },
    select: {
      id_personal: true,
      nombres: true,
      rol: true,
      email: true,
      password: true, // ← sin esto no se compara nada
    },
  });
console.log('=== LOGIN PERSONAL ===');
console.log('Email recibido:', email);
console.log('Password recibido:', password);
console.log('Usuario encontrado:', user);


  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas (usuario no encontrado)');
  }

  const ok = await bcrypt.compare(password, user.password);
console.log('Hash en base de datos:', user.password);
console.log('Resultado de bcrypt.compare():', ok);

  if (!ok) {
    throw new UnauthorizedException('Credenciales inválidas (contraseña incorrecta)');
  }

  const payload = { sub: user.id_personal, name: user.nombres, rol: user.rol };
  const expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';
  const token = this.jwtService.sign(payload, { expiresIn });

  const decoded: any = this.jwtService.decode(token);
  const token_expiration = decoded?.exp
    ? new Date(decoded.exp * 1000).toISOString()
    : undefined;

  return { access_token: token, token_expiration };
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
