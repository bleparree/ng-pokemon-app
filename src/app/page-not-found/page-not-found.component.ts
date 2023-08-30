import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Router Component => Page not fount (404) component */
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: [
  ]
})
export class PageNotFoundComponent {
  
  /**
   * Constructor
   * @param router Initiate the router to provide redirections
   */
  constructor(private router: Router){}

  /** Action Button: Send the user to the application home */
  goHome() {
    this.router.navigate(['/pokemons'])
  }
}
