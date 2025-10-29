import { SetMetadata } from '@nestjs/common';
import { Rol } from '../personal_clinico/enums/roles.enum';

export const Roles = (...roles: Rol[]) => SetMetadata('roles', roles);
