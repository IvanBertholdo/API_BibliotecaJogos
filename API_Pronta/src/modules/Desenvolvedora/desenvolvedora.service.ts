import { Injectable, Response } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { DesenvolvedoraDTO } from './desenvolvedora.dto';

@Injectable()
export class DesenvolvedoraService {
    constructor(private prisma: PrismaService){}

    async atributeExists(id: string){
        const atributeExists = await this.prisma.jogo.findUnique({
            where: {
                id,
            }
        })

        if (!atributeExists){
            throw Error ("Não está cadastrado!")
        }
    }

    async create(data: DesenvolvedoraDTO){
        if (data.nome === ""){
            throw new Error("Um nome precisa ser definido!")
        } 
        
        const desenvolvedoraExists = await this.prisma.desenvolvedora.findFirst({
            where: {
                nome: data.nome,
            }
        })

        if (desenvolvedoraExists){
            throw new Error("Essa Desenvolvedora já está cadastrada!")
        }

        const desenvolvedora = await this.prisma.desenvolvedora.create({
            data
        })

        return desenvolvedora
    }

    async findAll(){
        return await this.prisma.desenvolvedora.findMany()
    }

    async listASC(){
        return await this.prisma.desenvolvedora.findMany({
        select: {
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
        await this.atributeExists(id)

        /*const desenvolvedoraExists = await this.prisma.desenvolvedora.findFirst({
            where: {
                id,
            }
        })

        if (!desenvolvedoraExists){
            throw new Error("Essa Desenvolvedora não está cadastrada!")
        }*/

        return await this.prisma.desenvolvedora.delete({
            where:{
                id,
            }
        })
    }

    async update(id: string, data: DesenvolvedoraDTO){
        await this.atributeExists(id)
        
        /*const desenvolvedoraExists = await this.prisma.desenvolvedora.findUnique({
            where: {
                id,
            }
        })

        if (!desenvolvedoraExists){
            throw new Error("Essa Desenvolvedora não está cadastrada!")
        }*/

        return await this.prisma.desenvolvedora.update({
            where: {
                id,
              },
              data
            })
    }

    async getJogosPorDesenvolvedora(nome: string) {
        const desenvolvedoraExists = await this.prisma.desenvolvedora.findFirst({
            where: {
                nome,
            }
        })

        if (!desenvolvedoraExists){
            throw new Error("Essa Desenvolvedora não está cadastrada!")
        }

        return this.prisma.desenvolvedora.findUnique({
          where: {
            nome,
          },
          select: {
            nome:true,
            jogos: {
                select: {
                    nome: true
                },
              },
            },
          });
  }
}

