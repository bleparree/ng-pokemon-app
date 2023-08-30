import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth.guard';

import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';

import { BorderCardDirective } from './directives/attributes/border-card.directive';

import { PokemonService } from './pokemon.service';
import { PokemonTypeService } from './pokemonType.service';
import { AppSharedModule } from '../appShared.module';

/** 
 * Pokemon level application routes (EveryRoute are controled but the AuthGuard)
 * - PokemonList
 * - Create a new Pokemon
 * - View a single Pokemon
 * - Edit a Pokemon
*/
const pokemonRoutes: Routes = [
  { path: 'pokemons', component: ListPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemon/edit/:id', component: EditPokemonComponent, canActivate: [authGuard]}
];

/**
 * Declaration => Standard
 * imports:
 *  - Standard
 *  - Route constant
 * Providers:
 * - The two pokemon Services (API Data Access)
 */
@NgModule({
  declarations: [
    DetailPokemonComponent,
    ListPokemonComponent,
    BorderCardDirective,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppSharedModule,
    RouterModule.forChild(pokemonRoutes)
  ],
  providers: [PokemonService, PokemonTypeService]
})
export class PokemonModule { }
