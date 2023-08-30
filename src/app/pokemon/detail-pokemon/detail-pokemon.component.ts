import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '../data/pokemon';
import { PokemonType } from '../data/pokemonType';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeService } from '../pokemonType.service';

/** Component page of the detail of a pokemon */
@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styles: []
})
export class DetailPokemonComponent implements OnInit {
  //Global Loader of the page waiting element to load
  loader:boolean;
  //Pokemon object
  pokemon:Pokemon|undefined;
  //List of pokemonType to render the pokemon color
  pokemonTypes:PokemonType[];

  /**
   * Constructor
   * @param activatedRoute Used to retrieve information such as the pokemon id in the url
   * @param router Used to navigate in another page
   * @param pokemonService Service used to get the Pokemon Informations to render
   * @param pokemonTypeService Service used to get the Pokemon Type List to render the pokemon colors
   */
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private pokemonService: PokemonService, private pokemonTypeService:PokemonTypeService) {}

  /**
   * Initialize/Show the loader
   * Request for the pokemon information throught the id in the url
   * => When loaded, hide the load and fill the page
   * Request the Pokemon Type List to render the pokemon colors
   */
  ngOnInit(): void {
    this.loader=true;
    if (Number.isInteger(Number(this.activatedRoute.snapshot.paramMap.get('id'))))
    {
      this.pokemonService.getPokemonById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(poke => { this.loader = false; this.pokemon = poke; });
    }
    this.pokemonTypeService.getPokemonTypeList().subscribe(ptl => this.pokemonTypes = ptl)
  }

  /**
   * ActionButton: Go to the pokemon edition page
   */
  editPokemon(): void {
    this.router.navigate(['/pokemon/edit', this.pokemon?.id.toString()]);
  }

  /**
   * ActionButton: Delete the pokemon throught the pokemonservice and call the goBack function
   */
  deletePokemon(): void {
    if (this.pokemon) {
      this.pokemonService.deletePokemonById(this.pokemon.id).subscribe(() => this.goBack())
    }
  }

  /**
   * ActionButton: Navigate to the pokemon list
   */
  goBack(): void {
    this.router.navigateByUrl('/pokemons');
  }
}
