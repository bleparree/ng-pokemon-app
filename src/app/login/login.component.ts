import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

/** Router Component => Login/Logout page */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  /** username & password to connect */
  name:string;
  password:string;
  /** ErrorMessage rendered to the front user */
  errorMessage:string;
  /** Global Message rendered to the front user (no matter if there is an error or not) */
  message:string;
  /** Authentication Service ==> to drive it available in the HTML template */
  auth: AuthService;

  /**
   * Constructor
   * @param authService to initiate connexions
   * @param router to go on another pages when login succeed
   */
  constructor(private authService: AuthService, private router:Router){}

  /** Initialize the Auth param and setup a basic message for the first connexion */
  ngOnInit(): void {
    this.auth = this.authService;
    this.setMessage();
  }

  /** Action Button to login
   * Check with the authservice (and proceed inside)
   *  - Redirect to the application in case of success
   *  - Show an error message if not
   */
  login() {
    this.message = 'Authentification en cours ...'
    this.authService.login(this.name, this.password)
      .subscribe(isloggedIn => {
        if (isloggedIn) {
          this.setMessage();
          this.router.navigate(['/pokemons']);
        }
        else {
          this.message = 'Identifiants ou mot de passe incorrect.';
          this.password = '';
        }
      });
  }

  /** Action Button to Logout
   * Logout from the AuthService (and proceed inside)
   * Show a standard message informing of the disconnection
   */
  logout(){
    this.authService.logout();
    this.message = 'Vous êtes déconnecté. (pikachu/pikachu)'
  }

  /** Configure the standard message regarding the current configuration */
  setMessage() {
    if (this.router.url.indexOf('reason=InvalidToken') > -1) {
      this.errorMessage = 'Votre Token de connexion a expiré !';
    }
    if (this.authService.isLoggedIn) {
      this.message = 'Vous êtes connecté.';
    }
    else {
      this.message = 'Vous êtes déconnecté. (pikachu/pikachu)';
    }
  }
}
