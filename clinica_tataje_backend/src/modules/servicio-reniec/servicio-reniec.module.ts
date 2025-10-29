import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config'; // <-- IMPORTANTE
import { ServicioReniecService } from './servicio-reniec.service';
import { ServicioReniecController } from './servicio-reniec.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ServicioReniecController],
  providers: [ServicioReniecService],
  exports: [ServicioReniecService], // Exportamos el servicio para que pueda ser utilizado en otros módulos
})
export class ServicioReniecModule {}
