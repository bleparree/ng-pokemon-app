import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Pokemon } from '../data/pokemon';
import { PokemonService } from '../pokemon.service';

/** Component to call as an element to show a dynamic search text field */
@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {
  // A list of search terms
  // {..."a"..."ab"..."abz"..."ab"..."abc"....}
  searchTerms = new Subject<string>();
  //The full list of Pokemons
  // {... pokemonList(a) ... pokemonList(ab)...}
  pokemons$:Observable<Pokemon[]>;

  /**
   * Constructor
   * @param router The router to navigate on a specific Pokemon when a user clic on it 
   * @param pokemonService The PokemonService to search for a pokemon Name
   */
  constructor(private router:Router, private pokemonService:PokemonService){}

  /**
   * initialize the main thing in the component consisting on:
   * - create a subscription to the "searchTerms" value change
   * - Wait for 300ms to treat those change
   * - Keep only the last one of each of those 300ms period
   * - Launch a search on keeped word and affect the result to the pokemon$ value
   */
  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"..."abc"....}
      debounceTime(300),
      // {......."ab"........."ab"..."abc"....}
      distinctUntilChanged(),
      // {......."ab"................"abc"....}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {.......PokemonList<"ab">................PokemonList<"abc">....}
    );
  }

  /**
   * KeyUp action on the textField to add a new term to the searchterm list
   * @param term term to add in the searchterm list
   */
  search(term:string){
    this.searchTerms.next(term);
  }

  /**
   * Action Button to navigate on the search pokemon
   * @param pokemon Pokemon to reach
   */
  goToDetail(pokemon:Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
