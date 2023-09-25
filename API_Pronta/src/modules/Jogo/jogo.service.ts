import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { JogoDTO } from './jogo.dto';

@Injectable()
export class JogoService {
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
    async create(data: JogoDTO){
        if (data.nome === ""){
            throw new Error("Um nome precisa ser definido!")
        } 

        if (data.preco < 0){
            throw new Error("O preço precisa ser um valor válido")
        } 
        
        const jogoExists = await this.prisma.jogo.findFirst({
            where: {
                nome: data.nome,
            }
        })

        if (jogoExists){
            throw new Error("Um jogo já foi cadastrado com esse nome!")
        }

        const generoExists = await this.prisma.genero.findUnique({
            where: {
                nome: data.genero_id,
            },
        });

        if (!generoExists) {
        throw new Error(`Gênero não encontrado!`);
        }

        const desenvolvedoraExists = await this.prisma.desenvolvedora.findUnique({
           where: {
              nome: data.desenvolvedora_id,
         },
        });

        if (!desenvolvedoraExists) {
            throw new Error(`Desenvolvedora não encontrada!`);
        }

        const jogo = await this.prisma.jogo.create({
            data: {
                nome: data.nome,
                preco: data.preco,
                desenvolvedora:{
                    connect: {
                        id: desenvolvedoraExists.id,
                    }
                },
                genero: {
                    connect: {
                        id: generoExists.id,
                    },
                },
                
            }, 
        });

        return jogo
    }

    async findAllJogos(){
        return await this.prisma.jogo.findMany()
    }

    async listASC(){
        return await this.prisma.jogo.findMany({
        select:{
            nome:true,
            preco:true
        },
        orderBy: [
            {
              nome: 'asc',
            },
        ]
        })
    }

    async findById(id: string) {
        /*const gameIdExists = await this.prisma.jogo.findUnique({
            where: {
                id,
            }
        })

        if (!gameIdExists){
            throw new Error("Esse ID não corresponde a nenhum jogo!")
        }*/
        await this.atributeExists(id)

        return await this.prisma.jogo.findUnique({
            where: { 
                id,
            }
        })
    }

    async findByIdSimples(id: string){
        const gameIdExists = await this.prisma.jogo.findFirst({
            where: {
                id:{
                    contains: id
                },
            }
        })

        if (!gameIdExists){
            throw new Error("Esse ID não corresponde a nenhum jogo!")
        }
        
        return await this.prisma.jogo.findMany({
            where: {
                id :{
                    contains: id
                },
            },
            select: {
            nome: true,
            preco: true,
            genero: {
                select: {
                    nome:true
                },
            },
            desenvolvedora: {
                select: {
                    nome:true
                },
            }
          }
        })
    
    }

    async delete(id: string){
        await this.atributeExists(id)

       /* const jogoExists = await this.prisma.jogo.findUnique({
            where: {
                id,
            }
        })

        if (!jogoExists){
            throw new Error("Esse Jogo não está cadastrado!")
        }*/

        return await this.prisma.jogo.delete({
            where:{
                id,
            }
        })
    }

    async deleteComNome(nome: string){
        const jogoExists = await this.prisma.jogo.findFirst({
            where: {
                nome: nome
            }
        })

        if (!jogoExists){
            throw new Error("Esse Jogo não está cadastrado!")
        }

        return await this.prisma.jogo.delete({
            where:{
                id: jogoExists.id,
            }
        })
    }

    async update(id: string, data: JogoDTO){
        await this.atributeExists(id)
        /*const JogoExists = await this.prisma.jogo.findFirst({
            where: {
                id,
            }
        })

        if (!JogoExists){
            throw new Error("Esse Jogo não está cadastrado!")
        }*/
        
        const generoExists = await this.prisma.genero.findUnique({
            where: {
                nome: data.genero_id,
            },
        });

        if (!generoExists) {
        throw new Error(`Gênero não encontrado!`);
        }

        const desenvolvedoraExists = await this.prisma.desenvolvedora.findUnique({
           where: {
              nome: data.desenvolvedora_id,
         },
        });

        if (!desenvolvedoraExists) {
            throw new Error(`Desenvolvedora não encontrada!`);
        }

        return await this.prisma.jogo.update({
            where:{
                id,
            },
            data: {
                nome: data.nome,
                preco: data.preco,
                desenvolvedora:{
                    connect: {
                        id: desenvolvedoraExists.id,
                    }
                },
                genero: {
                    connect: {
                        id: generoExists.id,
                    },
                },
                
            }, 
        });
    }

    async findAllInfos(){
        return await this.prisma.jogo.findMany({
          select: {
            nome: true,
            preco: true,
            genero: {
                select: {
                    nome:true
                },
            },
            desenvolvedora: {
                select: {
                    nome:true
                },
            }
          }
        })
    
    }

    async findAllInfosSimples(){
        return await this.prisma.jogo.findMany({
          include: {
            genero: true,
            desenvolvedora: true
          }
        })
    
    }

    async findByName(nome: string) {
        const gameNameExists = await this.prisma.jogo.findFirst({
            where: {
                nome:{
                    contains: nome
                },
            }
        })

        if (!gameNameExists){
            throw new Error("Esse nome não corresponde a nenhum jogo!")
        }
        return await this.prisma.jogo.findMany({
            where: { 
                nome: {
                    contains: nome
                }
            },
            select: {
                nome: true,
                preco: true,
                genero: {
                    select: {
                        nome:true
                    },
                },
                desenvolvedora: {
                    select: {
                        nome:true
                    },
                }
              }
            })
    }  

    async listForPriceASC(){
        return await this.prisma.jogo.findMany({
        orderBy: [
            {
              preco: 'asc',
            },
        ]
        })
    }

    async listForXPriceASC(preco: string){
        return await this.prisma.jogo.findMany({
            where:{
                preco : {
                    gte: preco,
                }
            },
            orderBy: [
                {
                preco: 'asc',
                },
            ]
        })
    }
}

