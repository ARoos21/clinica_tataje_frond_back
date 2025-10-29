import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ServicioReniecService } from './servicio-reniec.service';
import { CreateServicioReniecDto } from './dto/create-servicio-reniec.dto';

@ApiTags('Reniec')
@Controller('reniec')
export class ServicioReniecController {
  constructor(private readonly servicioReniecService: ServicioReniecService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Consultar datos por DNI',
    description:
      'Consulta datos personales desde el servicio RENIEC oficial usando un número de DNI.',
  })
  @ApiBody({
    type: CreateServicioReniecDto,
    description: 'Debe enviarse el número de documento (DNI) a consultar',
  })
  @ApiResponse({
    status: 200,
    description:
      'Consulta exitosa, devuelve los datos personales del ciudadano',
    schema: {
      example: {
        dni: '12345678',
        nombres: 'JUAN CARLOS',
        apellido_paterno: 'PEREZ',
        apellido_materno: 'GARCIA',
        fecha_nacimiento: '1990-05-10',
        genero: 'Masculino',
        ubigeo: 'LIMA - LIMA - SAN ISIDRO',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor o error en la consulta a RENIEC',
  })
  async consultarPorDni(@Body() dto: CreateServicioReniecDto) {
    try {
      return await this.servicioReniecService.consultarPorDni(dto);
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
  }

  @Post('consulta-dni')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Consultar datos por DNI (APIS externas)',
    description:
      'Consulta datos personales desde una API alternativa externa a RENIEC usando el número de DNI.',
  })
  @ApiBody({
    type: CreateServicioReniecDto,
    description: 'Debe enviarse el número de documento (DNI) a consultar',
  })
  @ApiResponse({
    status: 200,
    description:
      'Consulta exitosa, devuelve los datos personales del ciudadano',
    schema: {
      example: {
        dni: '12345678',
        nombres: 'MARIA FERNANDA',
        apellido_paterno: 'LOPEZ',
        apellido_materno: 'RAMIREZ',
        fecha_nacimiento: '1985-12-20',
        estado_civil: 'CASADO',
        genero: 'Femenino',
        ubigeo: 'AREQUIPA - AREQUIPA - CERCADO',
        direccion: 'AV. LOS INCAS 123',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error al consultar el servicio APIS externo',
  })
  async consultarPorDnis(@Body() dto: CreateServicioReniecDto) {
    try {
      return await this.servicioReniecService.consultarPorDniApis(dto);
    } catch (error) {
      console.error(
        'Error al consultar APIS:',
        error?.response?.data || error.message || error,
      );
      throw new InternalServerErrorException(
        `Error al consultar el servicio APIS: ${error?.response?.data?.message || error.message}`,
      );
    }
  }
}
