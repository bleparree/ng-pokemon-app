import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NavigationStart, Router } from '@angular/router';
import { EditPokemonTypesComponent } from './pokemon/edit-pokemon-types/edit-pokemon-types.component';
import {Dialog} from '@angular/cdk/dialog';

/** Core Component of the application / always on the screen */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  //Information to show or not some button to the user if he is connected
  showDisconnect:boolean=false;

  /**
   * 
   * @param dialog To Open a Dialog => for the PokemonType Edition)
   * @param authService To check Authentification
   * @param router To get updates of login statut
   */
  constructor(public dialog: Dialog, private authService: AuthService, private router:Router) {}

  /** Initialize the login statut and subscribe to the router and authService Events to get the updates */
  ngOnInit(): void {
    this.showDisconnect = this.authService.isLoggedIn;
    this.router.events.subscribe((event) => {
      if (event as NavigationStart)
        this.showDisconnect = this.authService.isLoggedIn;
      this.authService.isloggedInChange().subscribe(() => this.showDisconnect = this.authService.isLoggedIn);
    })

  }

  /** Open the PokemonType Edition dialoog */
  openDialog(): void {
    this.dialog.open<string>(EditPokemonTypesComponent, { panelClass: 'custom-dialog-container', disableClose: true });
  }
}