import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../data/pokemon';
import { PokemonType } from '../data/pokemonType';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeService } from '../pokemonType.service';

/** Global Pokemon List component (Router Component) */
@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: []
})
export class ListPokemonComponent implements OnInit {
  //To determine the presence of the global list loader
  loader:boolean;
  //The full Pokemon List
  pokemonList:Pokemon[];
  //The Pokemon Type List
  pokemonTypeList:PokemonType[];

  /**
   * Constructor
   * @param router to navigate on different pages
   * @param pokemonService to get the Pokemon List
   * @param pokemonTypeService To get the PokemonType List
   */
  constructor(private router: Router, private pokemonService: PokemonService, private pokemonTypeService:PokemonTypeService){}

  /**
   * Initialize/show the loader
   * Get the pokemonTypeList (to render types in bubble for each pokemons)
   * Get the full pokemonList and stop the loader once we get the result
   */
  ngOnInit(): void {
    this.loader = true;
    this.pokemonTypeService.getPokemonTypeList().subscribe(ptl => this.pokemonTypeList = ptl);
    this.pokemonService.getPokemonList().subscribe({
      next : pokeList => { this.loader = false; this.pokemonList = pokeList; },
      error : error => { this.loader = true; this.pokemonList = []; }
    });
  }

  /**
   * PokemonClic: Navigate to the edition page of a pokemon
   * @param pokemon Pokemon to edit
   */
  selectPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id.toString()])
  }

  /** ActionButton: Navigate to the pokemon "add" page */
  addPokemon() {
    this.router.navigate(['/pokemon/add'])
  }
}
