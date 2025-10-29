import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Detectar según el rol
    if (payload.rol === 'paciente') {
      return {
        id_paciente: payload.sub,
        dni: payload.dni,
        name: payload.name,
        rol: payload.rol,
      };
    }

    // Personal clínico o administrador
    return {
      id_personal: payload.sub,
      nombres: payload.name,
      rol: payload.rol,
    };
  }
}
