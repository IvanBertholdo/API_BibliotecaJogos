import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { DesenvolvedoraService } from './desenvolvedora.service';
import {DesenvolvedoraDTO} from './desenvolvedora.dto'


@Controller('desenvolvedora')
export class DesenvolvedoraController {
  constructor(private readonly desenvolvedoraService: DesenvolvedoraService) {}

  @Post()
  async create(@Body() data: DesenvolvedoraDTO){
    return this.desenvolvedoraService.create(data);
  }

  @Get()
  async findAll(){
    return this.desenvolvedoraService.findAll();
  }

  @Get('list')
  async listASC(){
    return this.desenvolvedoraService.listASC();
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.desenvolvedoraService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: DesenvolvedoraDTO){
    return this.desenvolvedoraService.update(id, data);
  }

  @Get(':nome')
  async getJogosPorDesenvolvedora(@Param('nome') nome: string){
    return this.desenvolvedoraService.getJogosPorDesenvolvedora(nome);
  }
}

