import { Request } from 'express';

export interface PersonalUserReq extends Request {
  user: {
    id_personal: number;
    nombres: string;
    rol: string;
  };
}

export interface PacienteUserReq extends Request {
  user: {
    id_paciente: number;
    dni: string;
    name: string;
    rol: 'paciente';
  };
}
