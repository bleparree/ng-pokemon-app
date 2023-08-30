import { Pipe, PipeTransform } from '@angular/core';
import { PokemonType } from '../../data/pokemonType';

/** Angular Custom Pipe to render pokemon color in bubbles */
@Pipe({
  name: 'pokemonTypeColor'
})
export class PokemonTypeColorPipe implements PipeTransform {

  constructor() {}

  /**
   * Return a color based on the given type and the full PokemonType List provided
   * @param type PokemonType to render
   * @param pokemonTypeList PokemonType List containing how to render the type
   * @returns The color to render the bubble of the color
   */
  transform(type: string, pokemonTypeList: PokemonType[]): string {
    if (pokemonTypeList) {
      let pt = pokemonTypeList.find((p:PokemonType) => p.name == type);
      if(pt){
        return pt.color;
      }
      else {
        return 'grey';
      }
    }
    else {
      return 'grey';
    }
  }

}
