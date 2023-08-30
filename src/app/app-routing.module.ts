import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

/** 
 * Global level application routes 
 * Redirect to "pokemons" page when tried to access to the root page
 * If no redirection found, redirect to the PageNotFound Page
*/
const routes: Routes = [
  { path: '', redirectTo:'pokemons', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
