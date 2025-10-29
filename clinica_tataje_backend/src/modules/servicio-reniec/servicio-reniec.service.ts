import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateServicioReniecDto } from './dto/create-servicio-reniec.dto';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { estadoCivil } from '../pacientes/entities/paciente.entity';

/**
 * Servicio encargado de interactuar con la API de RENIEC para consultar información de personas por número de DNI.
 */
@Injectable()
export class ServicioReniecService {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  private readonly apisURL: string;
  private readonly apisToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.apiToken = this.configService.get<string>('API_TOKEN');

    this.apisURL = this.configService.get<string>('APIS_URL');
    this.apisToken = this.configService.get<string>('APIS_TOKEN');
  }

  async consultarPorDni(dto: CreateServicioReniecDto): Promise<any> {
    const payload = {
      token: this.apiToken,
      type_document: 'dni',
      document_number: dto.document_number,
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(this.apiUrl, payload),
      );

      if (!data.success || !data.data) {
        throw new InternalServerErrorException(
          'No se pudo obtener los datos del DNI',
        );
      }

      const persona = data.data;

      return {
        dni: persona.number,
        nombres: persona.name.trim(),
        apellido_paterno: persona.first_last_name.trim(),
        apellido_materno: persona.second_last_name.trim(),
        fecha_nacimiento: persona.date_of_birth.substring(0, 10),
        genero: persona.gender === 'Masculino' ? 'Masculino' : 'Femenino',
        ubigeo: `${persona.department.trim()} - ${persona.province.trim()} - ${persona.district.trim()}`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al consultar el servicio RENIEC',
      );
    }
  }

  async consultarPorDniApis(dto: CreateServicioReniecDto): Promise<any> {
    const url = `${this.apisURL}${dto.document_number}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.apisToken}`,
            Accept: 'application/json',
          },
        }),
      );

      const data = response?.data?.data;
      console.log('Respuesta de API:', data);

      return {
        dni: data?.numero ?? null,
        nombres: data?.nombres?.trim() ?? null,
        apellido_paterno: data?.apellido_paterno?.trim() ?? null,
        apellido_materno: data?.apellido_materno?.trim() ?? null,
        fecha_nacimiento: this.formatearFecha(data?.fecha_nacimiento),
        estado_civil: this.normalizarEstadoCivil(data?.estado_civil),
        genero:
          data?.sexo === 'VARON'
            ? 'Masculino'
            : data?.sexo === 'MUJER' || data?.sexo === 'FEMENINO'
              ? 'Femenino'
              : null,
        ubigeo: this.formatearUbigeo(
          data?.departamento,
          data?.provincia,
          data?.distrito,
        ),
        direccion: data?.direccion?.trim() ?? null,
      };
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

  private formatearFecha(fecha: string | undefined): string | null {
    if (!fecha || !fecha.includes('/')) return null;

    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  private formatearUbigeo(
    departamento?: string,
    provincia?: string,
    distrito?: string,
  ): string | null {
    const dep = departamento?.trim();
    const prov = provincia?.trim();
    const dist = distrito?.trim();

    if (!dep && !prov && !dist) return null;

    return `${dep ?? ''} - ${prov ?? ''} - ${dist ?? ''}`
      .replace(/\s+-\s+-\s+/, '')
      .trim();
  }

  private normalizarEstadoCivil(valor: string | undefined): estadoCivil {
    if (!valor) return estadoCivil.SOLTERO;

    const limpio = valor.trim().toUpperCase();

    switch (limpio) {
      case 'SOLTERO':
        return estadoCivil.SOLTERO;
      case 'CASADO':
        return estadoCivil.CASADO;
      case 'DIVORCIADO':
        return estadoCivil.DIVORCIADO;
      case 'VIUDO':
        return estadoCivil.VIUDO;
      default:
        return estadoCivil.SOLTERO; // Valor por defecto
    }
  }

  // metodo get :https://apis.aqpfact.pe/api/dni/76566183
  // result:{
  // "numero": "76566183",
  //         "nombre_completo": "GUERRA CHIPANA, LUIS FERNANDO",
  //         "name": "GUERRA CHIPANA, LUIS FERNANDO",
  //         "nombres": "LUIS FERNANDO",
  //         "apellido_paterno": "GUERRA",
  //         "apellido_materno": "CHIPANA",
  //         "codigo_verificacion": "3",
  //         "fecha_nacimiento": "21/04/2004",
  //         "sexo": "VARON",
  //         "estado_civil": " ",
  //         "departamento": "ICA",
  //         "provincia": "PISCO",
  //         "distrito": "TUPAC AMARU INCA",
  //         "direccion_completa": "ERNESTO R. DIEZ CANSECO mz. 3 lt. 06 - ICA-PISCO-TUPAC AMARU INCA",
  //         "ubigeo_reniec": "100401",
  //         "ubigeo_sunat": null,
  //         "direccion": "ERNESTO R. DIEZ CANSECO mz. 3 lt. 06",
  //         "ubigeo": [
  //             null,
  //             null,
  //             null
  //         ]}

  // tambien tiene un token:
  // APIS_URL=https://apis.aqpfact.pe/api/dni/
  // APIS_TOKEN=7418|n7gE1oXttrn1XGzxFCQW1NXTL2nGdRCyFC132fxF
  // como puedo colocar para utilizar tambien este servicio
}
