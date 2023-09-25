import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { PrismaService } from 'src/database/PrismaService';
import { Middleware } from './genero.middleware';

@Module({
  controllers: [GeneroController],
  providers: [GeneroService, PrismaService, Middleware],
})
export class GeneroModule {}
