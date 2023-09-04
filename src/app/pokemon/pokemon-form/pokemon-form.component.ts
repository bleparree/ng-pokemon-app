import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from '../data/pokemon';
import { PokemonType } from '../data/pokemonType';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeService } from '../pokemonType.service';

/** 
 * Component to call as an element: used to create or edit a pokemon 
 * Take a "[pokemon]" as input field
 */
@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  //Input of the Pokemon to work on.
  @Input() pokemon:Pokemon;
  //Show a loader spinner the time the form is fully loaded
  loader:boolean;
  //The list of PokemonTypes
  types:PokemonType[];
  //Boolean to determine and conditionned if it's an "add" or "update" instance of the form
  isAddForm:boolean;
  //Contain the value of the picture choice radio button
  pictureRadioChoice:string;
  //CurrentPictureNumber (picture picker)
  currentPictureNumber:number;

  /**
   * Constructor
   * @param pokemonService Service to get/add/update the Pokemon informations
   * @param pokemonTypeService Service to get the PokemonTypes informations
   * @param router Used to redirect user and retrieve if the form must be in add or update configuration
   */
  constructor(private pokemonService:PokemonService, private pokemonTypeService:PokemonTypeService, private router:Router) {}

  /**
   * Intialize the form
   * - Activate the loader
   * - Retrieve the full pokemontype list
   * - Determine if the form must be in add or update mode
   */
  ngOnInit(): void {
    this.loader = true;
    this.pictureRadioChoice = 'Librairy';
    this.currentPictureNumber = 1;
    this.pokemonTypeService.getPokemonTypeList().subscribe(tl => this.subscribeGetTypes(tl));
    this.isAddForm = this.router.url.includes('/add');
  }
  
  /**
   * Affect the PokemonType List and put the loader off
   * @param t The PokemonType List
   */
  subscribeGetTypes(t:PokemonType[]){
    this.types = t;
    this.loader = false;
  }

  /**
   * Action Button: Form validation => Update or add the pokemon and send back to the view page of this pokemon
   */
  onSubmit(): void{
    if (this.pokemon.id && this.pokemon.id != 0){
      this.pokemonService.updatePokemon(this.pokemon).subscribe(pok => {
        this.router.navigate(['/pokemon', this.pokemon.id]);
      })
    }
    else {
      this.pokemon.created = new Date(Date.now());
      this.pokemonService.addPokemon(this.pokemon).subscribe(pok => {
        this.router.navigate(['/pokemon', pok.id]);
      })
    }
  }

  /**
   * Check if the current pokemon already have this type declared
   * @param type Pokemon type (from data/pokemon object)
   * @returns yes if the pokemon already have this type declared. No otherwise
   */
  hasType(type:string): boolean{
    return this.pokemon.types.includes(type);
  }

  /**
   * Event OnChange on the type checkbox. Check or uncheck the type 
   * And inpact the pokemon configuration
   * @param event OnChangeEvent to capture which input have been clicked
   * @param type the pokemonType
   */
  selectType(event:Event, type:string): void{
    if (this.types.find(t => t.name === type)){
      if ((event.target as HTMLInputElement).checked && !this.pokemon.types.find(t => t === type))
        this.pokemon.types.push(type);
      else if (this.pokemon.types.find(t => t === type)) {
        this.pokemon.types.splice(this.pokemon.types.indexOf(type), 1);
      }
    }
    else{
      console.error('Invalid Pokemon Type')
    }
    console.log(this.pokemon.types);
  }

  /**
   * Pokemon Types can be selected if the current list contain 1>=type<=3
   * @param type Selected PokemonType
   * @returns True if the current list allow to add one or remove the current one
   */
  isTypesValid(type:string): boolean{
    if (this.pokemon != undefined && ((!this.hasType(type) && this.pokemon.types.length < 3) 
      || (this.hasType(type) && this.pokemon.types.length > 1))){
      return true;
    }
    else return false;
  }

  /**
   * Check if the current form is valid (with the angular html validators + the current pokemon type list)
   * @param htmlFormValid Angular Html validator
   * @returns True if the form is valid
   */
  formValidador(htmlFormValid:boolean): boolean {
    if (!htmlFormValid) {
      htmlFormValid = !(this.pokemon.types.length > 0);
    }
    return htmlFormValid;
  }

  /**
   * Go to the next Pokemon Picture
   */
  previousPicture() {
    if (this.currentPictureNumber > 1)
      this.currentPictureNumber--;

    this.updateStandardPicture();
  }

  /**
   * Go to the previous Pokemon Picture
   */
  nextPicture() {
    if (this.currentPictureNumber < 500)
      this.currentPictureNumber++;

    this.updateStandardPicture();
  }

  /**
   * Update the pokemon Picture based on the currentPictureNumber
   */
  updateStandardPicture() {
    switch (true){
      case this.currentPictureNumber < 10:
        this.pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${this.currentPictureNumber}.png`;
        break;
      case this.currentPictureNumber < 100:
        this.pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${this.currentPictureNumber}.png`;
        break;
      default:
        this.pokemon.picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.currentPictureNumber}.png`;
        break;
    }
  }
}
