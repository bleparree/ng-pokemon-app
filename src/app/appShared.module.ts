import { NgModule } from '@angular/core';
import { PokemonTypeColorPipe } from './pokemon/directives/pipes/pokemon-type-color.pipe';

/** Module to share sub component across modules */
@NgModule({
  imports: [
  ],
  declarations: [ 
    PokemonTypeColorPipe
  ],
  exports: [
    PokemonTypeColorPipe
  ]
})
export class AppSharedModule {}