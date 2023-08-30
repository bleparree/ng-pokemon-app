import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { POKEMONS } from './pokemon/data/mock-pokemon'

/**
 * Simulate a standard API based on the "Pokemons" constant
 */
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pokemonsMemory = POKEMONS;
    return { pokemonsMemory }
  }
}
