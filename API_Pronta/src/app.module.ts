import { Module } from '@nestjs/common';
import { JogoModule } from './modules/Jogo/jogo.module';
import { GeneroModule } from './modules/Genero/genero.module';
import { DesenvolvedoraModule } from './modules/Desenvolvedora/desenvolvedora.module';

@Module({
  imports: [JogoModule, GeneroModule, DesenvolvedoraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
