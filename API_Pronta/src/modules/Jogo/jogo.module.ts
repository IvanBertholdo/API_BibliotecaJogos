import { Module } from '@nestjs/common';
import { JogoService } from './jogo.service';
import { JogoController } from './jogo.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [JogoController],
  providers: [JogoService, PrismaService],
})
export class JogoModule {}
