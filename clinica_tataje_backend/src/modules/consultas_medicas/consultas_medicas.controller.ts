import { Controller, Post, Body } from '@nestjs/common';
import { ConsultasMedicasService } from './consultas_medicas.service';
import { CreateConsultasMedicaDto } from './dto/create-consultas_medica.dto';

@Controller('consultas-medicas')
export class ConsultasMedicasController {
  constructor(
    private readonly consultasMedicasService: ConsultasMedicasService,
  ) {}

  @Post()
  create(@Body() createConsultasMedicaDto: CreateConsultasMedicaDto) {
    return this.consultasMedicasService.crearConsulta(createConsultasMedicaDto);
  }
}
