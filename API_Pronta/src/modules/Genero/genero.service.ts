import { Injectable, Response } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GeneroDTO } from './genero.dto';
import { Middleware } from './genero.middleware';

@Injectable()
export class GeneroService {
    constructor(private prisma: PrismaService,
        private middleware: Middleware){}

    async atributeExists(id: string){
        const atributeExists = await this.prisma.genero.findUnique({
            where: {
                id,
            }
        })

        if (!atributeExists){
            throw Error ("Não está cadastrado!")
        }
    }

    async create(data: GeneroDTO){
        if (data.nome === ""){
            throw new Error("Um nome precisa ser definido!")
        } 
        
        const generoExists = await this.prisma.genero.findFirst({
            where: {
                nome: data.nome,
            }
        })

        if (generoExists){
            throw new Error("Este Gênero já está cadastrado!")
        }
        

        const genero = await this.prisma.genero.create({
            data
        })

        return genero
    }

    async findAll(){
        return await this.prisma.genero.findMany()
    }

    async listASC(){
        return await this.prisma.genero.findMany({
        select:{
            nome:true
        },
        orderBy: [
            {
              nome: 'asc',
            },
        ]
        })
    }

    async delete(id: string){
        //await this.atributeExists(id)
        await this.middleware.Exists(id)
        /*const generoExists = await this.prisma.genero.findFirst({
            where: {
                id,
            }
        })

        if (!generoExists){
            throw new Error("Esse Gênero não está cadastrado!")
        }*/

        return await this.prisma.genero.delete({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: GeneroDTO){
        //await this.atributeExists(id)
        await this.middleware.Exists(id)
        /*const generoExists = await this.prisma.genero.findUnique({
            where: {
                id,
            }
        })

        if (!generoExists){
            throw new Error("Esse Gênero não está cadastrado!")
        }*/

        return await this.prisma.genero.update({
            where: {
                id,
              },
              data
            })
    }

    async getJogosPorGenero(nome: string) {
        const generoExists = await this.prisma.genero.findFirst({
            where: {
                nome,
            }
        })

        if (!generoExists){
            throw new Error("Esse Gênero não está cadastrado!")
        }
          return this.prisma.genero.findUnique({
            where: {
              nome,
            },
            select: {
                nome: true,
                jogos: {
                    select: {
                        nome: true
                  },
                },               
            },
        });
    }
}
