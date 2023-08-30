import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from '../data/pokemon';
import { PokemonService } from '../pokemon.service';

/** Top component calling the "Fom Component" to edit a pokemon */
@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h1 class="center">Editer {{ pokemon?.name }}</h1>
    <app-loader *ngIf="loader"></app-loader>
    <p *ngIf="pokemon" class="center"><img [src]="pokemon.picture"/></p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]=pokemon></app-pokemon-form>`,
  styles: [
  ]
})
export class EditPokemonComponent implements OnInit {
  //Global Loader waiting for the form to load
  loader:boolean;
  //Pokemon to edit
  pokemon:Pokemon|undefined;

  /**
   * Constructor
   * @param pokemonService To get the pokemon to edit from his id in url
   * @param activatedRoute To extract informations from the url (such as the id)
   */
  constructor(private pokemonService:PokemonService, private activatedRoute:ActivatedRoute) {}

  /**
   * Activate the Loader
   * Get the pokemon from the service with the id in the url page (and deactivate the loader)
   */
  ngOnInit(): void {
    this.loader = true;
    if (Number.isInteger(Number(this.activatedRoute.snapshot.paramMap.get('id')))){
      this.pokemonService.getPokemonById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(poke => { this.loader = false; this.pokemon = poke; });
    }
  }
}
