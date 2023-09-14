import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

import { Pokemon } from './data/pokemon';
import { AuthService } from '../auth.service';
import ConfigJson from '../../assets/config.json';

/** Service to access to the Pokemon Data Api */
@Injectable()
export class PokemonService {
  //True if the Project if configure to work with a true API Behind (Value provided by assets/config.json)
  apiMode:boolean;
  //Declared HttpOption Object containing the bearerToken needed for the real API Connection
  httpOptions:Object;

  /**
   * Constructor
   * - Initialize the token
   * @param http HttpClient to consume external urls/Apis
   * @param router To redirect the User when the token is not operational anymore
   * @param auth To logout when the token is not operational anymore
   */
  constructor(private http:HttpClient, private router:Router, private auth:AuthService){
    this.initToken();
  }

  /** Initialize the token from session informations and setup the httpOptions Object with it */
  private initToken(){
    var temptoken = sessionStorage.getItem('bearertoken');
    var bearerToken = temptoken != null ? temptoken : '';

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': bearerToken })
    };
  }

  /**
   * Access to the API (simulated or not) to get the full PokemonList
   * @returns An Observable with a list of Pokemon
   */
  getPokemonList(): Observable<Pokemon[]> { 
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.get<any>(ConfigJson.rest.apiUrl + 'api/pokemons', this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => { this.handleError(error, []); throw error; })
      );
    }
    else {
      return this.http.get<Pokemon[]>('api/pokemonsMemory').pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      );
    }
  }

  /**
   * Access to the API (simulated or not) to get a pokemon corresponding to the given id
   * @param pokemonId Id of the pokemon to search
   * @returns The corresponding Pokemon or Undefined
   */
  getPokemonById(pokemonId:number): Observable<Pokemon|undefined> {
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.get<any>(ConfigJson.rest.apiUrl + `api/pokemon/${pokemonId}`, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data[0]) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      return this.http.get<Pokemon|undefined>(`api/pokemonsMemory/${pokemonId}`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, undefined))
      )
    }
  }

  /**
   * Access to the API (simulated or not) to get a Pokemon corresponding to the given name
   * @param term The exact name of the Pokemon we search
   * @returns The corresponding Pokemon in a list (or an empty list)
   */
  searchPokemonList(term:string):Observable<Pokemon[]>{
    this.initToken();
    if (term.length<=1){
      return of([]);
    }else {
      if (ConfigJson.apiMode) {
        return this.http.get<any>(ConfigJson.rest.apiUrl + `api/pokemons?name=${term}`, this.httpOptions)
        .pipe(
          tap((response) => this.log(response)),
          switchMap((response) => { return of(response.data) }),
          catchError((error) => this.handleError(error, []))
        );
      }
      else {
        return this.http.get<Pokemon[]>(`api/pokemonsMemory/?name=${term}`).pipe(
          tap((response) => this.log(response)),
          catchError((error) => this.handleError(error, []))
        );
      }
    }
  }

  /**
   * Create a brand new Pokemon (in the API simulated or not)
   * @param pokemon The pokemon to create
   * @returns The created Pokemon (with his generated id and createdDate)
   */
  addPokemon(pokemon:Pokemon): Observable<Pokemon>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.post<any>(ConfigJson.rest.apiUrl + `api/pokemon`, pokemon, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      let httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/json'})
      }
      return this.http.post<Pokemon>('api/pokemonsMemory', pokemon, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      );
    }
  }

  /**
   * Update a Pokemon (in the API simulated or not)
   * @param pokemon The pokemon to update
   * @returns The updated Pokemon
   */
  updatePokemon(pokemon:Pokemon): Observable<any>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.put<any>(ConfigJson.rest.apiUrl + `api/pokemon/${pokemon.id}`, pokemon, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      let httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/json'})
      }
      return this.http.put('api/pokemonsMemory', pokemon, httpOptions).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      );
    }
  }

  /**
   * Delete a Pokemon (from the API simulated or not)
   * @param pokemonId The Pokemon Id to delete
   * @returns True if the operation succeed
   */
  deletePokemonById(pokemonId:number):Observable<any>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.delete<any>(ConfigJson.rest.apiUrl + `api/pokemon/${pokemonId}`, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      const httpOptions = {
        headers: new HttpHeaders({'content-type': 'application/json'})
      }
      return this.http.delete(`api/pokemonsMemory/${pokemonId}`).pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, []))
      );
    }
  }

  /**
   * Generic http log
   * @param response http response containing informations to log
   */
  private log(response:any) {
    console.table(response);
  }

  /**
   * Error management
   * - Classic error
   * - 401 http error managment => lead to logout from the app
   * @param error The error object
   * @param errorValue The ErrorValue
   * @returns 
   */
  private handleError(error:Error, errorValue:any){
    if (error as HttpErrorResponse){
      let her = error as HttpErrorResponse;
      if (her.status == 401) {
        console.error(error);
        this.auth.logout();
        this.router.navigate(['/login'], { queryParams: { reason: 'InvalidToken' }});
        return of(errorValue);
      }
    }
    console.error(error);
    return of(errorValue);
  }
}
