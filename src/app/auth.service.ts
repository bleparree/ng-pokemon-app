import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, of, switchMap, tap } from 'rxjs';
import configJson from '../assets/config.json';

/** AuthService Class injected to the application root level (for all components and modules) */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Watching if the auth is running or not
  isLoggedIn: boolean = false;
  //Redirect url
  redirectUrl:string;

  //Expose an observable to export all login statut update
  private _logChange = new BehaviorSubject(false);
  isloggedInChange(): Observable<boolean> {
    return this._logChange.asObservable();
  }
  
  /**
   * Constructor
   * @param http HttpClient to consume external urls/Apis
   */
  constructor(private http:HttpClient){
    if (sessionStorage.getItem("bearertoken")) {
      this.isLoggedIn = true;
    }
  }

  /**
   * Action Button: To Log the user
   *  - Manage two mode => API and no API
   *  - Register the token once connected (to be used for further connexion's / request to the API)
   *  - Trigger the login update (_logChange)
   * @param name Authentification Username
   * @param password Authentification Password
   * @returns Observable < returning true if the login succeed >
   */
  login(name:string, password:string): Observable<boolean> {
    if (configJson.apiMode) {
          return this.http.post<any>(configJson.rest.apiUrl + `api/login?username=${name}&password=${password}`, '').pipe(
            switchMap((response) => { 
              try {
                console.log(response.token);
                sessionStorage.setItem("bearertoken", 'Bearer ' + response.token);
                this.isLoggedIn = true;
                this._logChange.next(true);
                return of(true); 
              }
              catch (error){ 
                console.error(error); 
                return of(false); 
              }
            }),
            catchError((error) => {
              console.error(error);
              return of(false);})
          );
    }
    else {
      const isLoggedIn = (name == 'pikachu' && password == 'pikachu');

      if (isLoggedIn) this._logChange.next(true);
  
      return of(isLoggedIn).pipe(
        delay(1000), 
        tap(isLoggedIn => this.isLoggedIn = isLoggedIn));
    }
  }

  /** 
   * Logout the user
   * Remove the token from session
   * Trigger the _logChange event
   */
  logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem("bearertoken");
    this._logChange.next(false);
  }

  /** Set url redirection */
  setRedirectUrl(r:string){
    this.redirectUrl = r; 
  }
}
