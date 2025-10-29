import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as request from 'supertest';
import { Rol } from '../personal_clinico/enums/roles.enum';

/**
 * Guard que restringe el acceso a rutas según los roles de usuario.
 * 
 * Utiliza la metadata del decorador `@Roles()` para determinar qué roles pueden acceder a una ruta.
 * Si el rol del usuario no está incluido en los roles permitidos, se lanza una `ForbiddenException`.
 * 
 * @ejemplo
 * ```typescript
 * @UseGuards(RoleGuard)
 * @Roles(Rol.Admin)
 * @Get('admin')
 * getAdminData() { ... }
 * ```
 * 
 * @notas
 * - Requiere el servicio `Reflector` para leer la metadata de la ruta.
 * - Asume que el usuario autenticado está adjunto al request como `request.user`.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private hasRole(user: any, roles: Rol[]): boolean {
    return roles.includes(user.rol); // Verifica si el rol del usuario está en la lista de roles permitidos
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<Rol[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const user = request.user;

    if (!user || !this.hasRole(user, roles)) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso',
      );
    }

    return true;
  }
}
