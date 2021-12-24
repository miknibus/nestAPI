import { Module } from '@nestjs/common';

import { PokemonModule } from './pokemon/pokemon.module';
import { AppController } from './app.controller';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
