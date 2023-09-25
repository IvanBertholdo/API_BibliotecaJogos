import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { GeneroService } from './genero.service';
import {GeneroDTO} from './genero.dto'


@Controller('genero')
export class GeneroController {
  constructor(private readonly generoService: GeneroService) {}

  @Post()
  async create(@Body() data: GeneroDTO){
    return this.generoService.create(data);
  }

  @Get()
  async findAll(){
    return this.generoService.findAll();
  }

  @Get('list')
  async listASC(){
    return this.generoService.listASC();
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.generoService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: GeneroDTO){
    return this.generoService.update(id, data);
  }

  @Get(':nome')
  async getJogosPorGenero(@Param('nome') nome: string){
    return this.generoService.getJogosPorGenero(nome);
  }
}

