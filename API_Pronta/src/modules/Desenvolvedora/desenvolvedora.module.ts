import { Module } from '@nestjs/common';
import { DesenvolvedoraService } from './desenvolvedora.service';
import { DesenvolvedoraController } from './desenvolvedora.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [DesenvolvedoraController],
  providers: [DesenvolvedoraService, PrismaService],
})
export class DesenvolvedoraModule {}
