import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Pokemon[] {
    return POKEMONS;
    // return this.http.get<Pokemon[]>('api/pokemons').pipe(
    //   tap((response) => this.log(response)),
    //   catchError((error) => this.handleError(error, []))
    // );
  }

  getPokemonById(pokemonId: number): Pokemon|undefined {
    return POKEMONS.find(p => p.id == pokemonId);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte',
      'Normal',
      'Electrik', 
      'Poison', 
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
