import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a Pokemon', () => {
      service.create({
        name: 'Test Pokemon',
        dex: 999,
        moves: ['Test'],
      });
      const pokemon = service.getOne(1);
      expect(pokemon).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('deletes a pokemon', () => {
      service.create({
        name: 'Test Pokemon',
        dex: 999,
        moves: ['Test'],
      });
      const beforeDelete = service.getAll().length;
      service.delete(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw 404 error', () => {
      try {
        service.delete(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        name: 'Test Pokemon',
        dex: 999,
        moves: ['Test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        name: 'Test Pokemon',
        dex: 999,
        moves: ['Test'],
      });
      service.update(1, { name: 'Updated Test' });
      const pokemon = service.getOne(1);
      expect(pokemon.name).toEqual('Updated Test');
    });

    it('should throw 404 error', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
