import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';

import { PersonalClinicoService } from './personal_clinico.service';
import { CreatePersonalClinicoDto } from './dto/create-personal_clinico.dto';
import { CambiarCredencialesDto } from './dto/cambiar-credenciales.dto';
import { PersonalUserReq } from './user-request.Req';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Rol } from './enums/roles.enum';

import { PersonalClinico } from './entities/personal_clinico.entity';

@ApiBearerAuth()
@ApiTags('Personal Clínico')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('personalClinico')
export class PersonalClinicoController {
  constructor(
    private readonly personalClinicoService: PersonalClinicoService,
  ) {}

  // Crear nuevo personal clínico
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  @Post()
  @ApiOperation({ summary: 'Crear personal clínico' })
  @ApiBody({ type: CreatePersonalClinicoDto })
  @ApiResponse({
    status: 201,
    description: 'Personal clínico creado correctamente.',
    type: PersonalClinico,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async create(
    @Body() createPersonalClinicoDto: CreatePersonalClinicoDto,
    @Request() req: PersonalUserReq,
  ) {
    const rol = req.user.rol;
    try {
      return await this.personalClinicoService.crearPersonalClinico(
        createPersonalClinicoDto,
        rol,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Cambiar credenciales del personal clínico
  @Patch('credenciales')
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR, Rol.MEDICO, Rol.SECRETARIA)
  @ApiOperation({ summary: 'Cambiar credenciales del personal clínico' })
  @ApiBody({ type: CambiarCredencialesDto })
  @ApiResponse({
    status: 200,
    description: 'Credenciales cambiadas exitosamente.',
    type: PersonalClinico,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async credencial(
    @Request() req: PersonalUserReq,
    @Body() cambiarCredencialesDto: CambiarCredencialesDto,
  ) {
    const id_personal = req.user.id_personal;
    try {
      return await this.personalClinicoService.cambiarCredenciales(
        id_personal,
        cambiarCredencialesDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obtener todos los personales clínicos
  @Get()
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  @ApiOperation({ summary: 'Obtener todos los personales clínicos' })
  @ApiOkResponse({
    description: 'Lista de personal clínico obtenida exitosamente.',
    type: PersonalClinico,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async findAll(@Request() req: PersonalUserReq) {
    const rol = req.user.rol;
    try {
      return await this.personalClinicoService.findAll(rol);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Obtener un personal clínico por ID
  @Get(':id')
  @Roles(Rol.ADMINISTRADOR, Rol.SUPERADMINISTRADOR)
  @ApiOperation({ summary: 'Obtener un personal clínico por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({
    description: 'Personal clínico encontrado.',
    type: PersonalClinico,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async findOne(@Param('id') id_personal: number) {
    try {
      return await this.personalClinicoService.findOne(id_personal);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
