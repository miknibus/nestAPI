import { Injectable } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private pokemons: Pokemon[] = [];

  getAll(): Pokemon[] {
    return this.pokemons;
  }

  getOne(id: number): Pokemon {
    return this.pokemons.find((pokemon) => pokemon.id === +id);
  }

  delete(id: number): boolean {
    this.pokemons.filter((pokemon) => pokemon.id !== +id);
    return true;
  }

  create(pokemonData) {
    this.pokemons.push({
      id: this.pokemons.length + 1,
      ...pokemonData,
    });
  }
}
