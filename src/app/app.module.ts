import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { InMemoryDataService } from './in-memory-data.service';
import { LoginComponent } from './login/login.component';
import { EditPokemonTypesComponent } from './pokemon/edit-pokemon-types/edit-pokemon-types.component';
import { AppSharedModule } from './appShared.module';

/**
 * Declaration => Standard
 * imports:
 *  - Standard
 *  - HttpClientInMemoryWebApiModule ==> To run the application without backoffice (to run with the apimode=false in the assets/config.json file)
 *  - AppSharedModule ==> Module to share sub modules in "Pokemon"
 *  - BrowserAnimationsModule, CdkDropList, CdkDrag, DialogModule ==> AngularMaterial js animations
 */
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    EditPokemonTypesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true}),
    PokemonModule,
    AppRoutingModule,
    AppSharedModule,
    BrowserAnimationsModule,
    CdkDropList, CdkDrag, DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
