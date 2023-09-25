import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class Middleware {
    constructor(private prisma: PrismaService){}

    async Exists(id: string){
        const atributeExists = await this.prisma.genero.findUnique({
            where: {
                id,
            }
        })

        if (!atributeExists){
            throw Error ("Não está cadastrado!")
        }
    }
}


//Tive que colocar como provider no module e importar
// como constructor no service e importar