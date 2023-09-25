import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { JogoService } from './jogo.service';
import {JogoDTO} from './jogo.dto'


@Controller('jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Post()
  async create(@Body() data: JogoDTO){
    return this.jogoService.create(data);
  }

  @Get()
  async findAllJogos(){
    return this.jogoService.findAllJogos();
  }

  @Get('list')
  async listASC(){
    return this.jogoService.listASC();
  }

  @Get('infos')
  async findAllInfos(){
    return this.jogoService.findAllInfos();
  }

  @Get('all')
  async findAllInfosSimples(){
    return this.jogoService.findAllInfosSimples();
  }

  @Get('price')
  async listForPriceASC(){
    return this.jogoService.listForPriceASC();
  }

  @Get('price/:id')
  async listForXPriceASC(@Param('id') preco: string){
    return this.jogoService.listForXPriceASC(preco);
  }

  @Get(':id')
  async findById(@Param('id') id: string){
    return this.jogoService.findById(id);
  }

  @Get('simples/:id')
  async findByIdSimples(@Param('id') id: string){
    return this.jogoService.findByIdSimples(id);
  }

  @Get('nome/:id')
  async findByName(@Param('id') nome: string){
    return this.jogoService.findByName(nome);
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    return this.jogoService.delete(id);
  }

  @Delete('teste/:id')
  async deleteComNome(@Param('id') nome: string){
    return this.jogoService.deleteComNome(nome);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: JogoDTO){
    return this.jogoService.update(id, data);
  }
}

