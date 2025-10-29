import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalClinicoService } from './personal_clinico.service';
import { PersonalClinicoController } from './personal_clinico.controller';
import { PersonalClinico } from './entities/personal_clinico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalClinico])],
  controllers: [PersonalClinicoController],
  providers: [PersonalClinicoService],
})
export class PersonalClinicoModule {}
