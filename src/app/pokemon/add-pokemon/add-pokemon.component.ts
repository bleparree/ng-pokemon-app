import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../data/pokemon';

/** Top component calling the "Fom Component" to add a pokemon */
@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styles: [
  ]
})
export class AddPokemonComponent implements OnInit {
  //Pokemon to create
  pokemon:Pokemon;

  /** Initialize the pokemon to create */
  ngOnInit(): void {
    this.pokemon = new Pokemon();
  }
}
