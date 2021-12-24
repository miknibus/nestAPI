import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private pokemons: Pokemon[] = [];

  getAll(): Pokemon[] {
    return this.pokemons;
  }

  getOne(id: number): Pokemon {
    const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID: ${id} not found.`);
    }
    return pokemon;
  }

  delete(id: number) {
    this.getOne(id);
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
  }

  create(pokemonData: CreatePokemonDto) {
    this.pokemons.push({
      id: this.pokemons.length + 1,
      ...pokemonData,
    });
  }
  update(id: number, updateData: UpdatePokemonDto) {
    const pokemon = this.getOne(id);
    this.delete(id);
    this.pokemons.push({ ...pokemon, ...updateData });
  }
}
