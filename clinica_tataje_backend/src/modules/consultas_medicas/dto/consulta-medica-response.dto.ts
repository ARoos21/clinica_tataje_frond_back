// dto/consulta-medica-response.dto.ts

export class ConsultaMedicaResponseDto {
  id_consulta: number;
  historia: {
    id_historia: number;
    id_paciente: number;
    fecha_creacion: Date;
  };
  cita: {
    id_cita: number;
    id_paciente: {
      id_paciente: number;
      dni: string;
      nombres: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
    id_medico: {
      id_medico: number;
      id_personal: {
        id_personal: number;
        dni: string;
        nombres: string;
        apellido_paterno: string;
      };
      id_especialidad: {
        id_especialidad: number;
        nombre: string;
      };
    };
    motivo: string;
    estado: string;
  };
  fecha_consulta: Date;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
}
