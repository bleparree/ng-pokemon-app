import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

import { PokemonType } from './data/pokemonType';
import { AuthService } from '../auth.service';
import ConfigJson from '../../assets/config.json';

/** Service to access to the PokemonType Data Api */
@Injectable()
export class PokemonTypeService {
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
   * Access to the API (simulated or not) to get the full PokemonType List
   * @returns A full list of PokemonTypes
   */
  getPokemonTypeList(): Observable<PokemonType[]> {
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.get<any>(ConfigJson.rest.apiUrl + 'api/pokemontypes', this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      return of(this.getTypes());
    }
  }

  /**
   * Access to the API (simulated or not) to create a new PokemonType
   * @param pokemonType The PokemonType to create
   * @returns The created PokemonType (with his new generated id)
   */
  addPokemonType(pokemonType:PokemonType): Observable<PokemonType>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.post<any>(ConfigJson.rest.apiUrl + `api/pokemonType`, pokemonType, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      return of(pokemonType);
    }
  }

  /**
   * Access to the API (simulated or not) to Update a PokemonType
   * @param pokemonType The PokemonType to Update
   * @returns The updated PokemonType
   */
  updatePokemonType(pokemonType:PokemonType): Observable<any>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.put<any>(ConfigJson.rest.apiUrl + `api/pokemontype/${pokemonType.id}`, pokemonType, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      return of(true);
    }
  }

  /**
   * Access to the API (simulated or not) to Delete a PokemonType
   * @param pokemonTypeId Id of the pokemonType to delete
   * @returns True if the operation succeed
   */
  deletePokemonTypeById(pokemonTypeId:number):Observable<any>{
    this.initToken();
    if (ConfigJson.apiMode) {
      return this.http.delete<any>(ConfigJson.rest.apiUrl + `api/pokemontype/${pokemonTypeId}`, this.httpOptions)
      .pipe(
        tap((response) => this.log(response)),
        switchMap((response) => { return of(response.data) }),
        catchError((error) => this.handleError(error, []))
      );
    }
    else {
      return of(true);
    }
  }

  /**
   * Get a static list of pokemonType
   * @returns A static list of PokemonType
   */
  private getTypes(): PokemonType[]{
    var ret:PokemonType[] = [
      {
        id: 0,
        name: 'Feu',
        color: '#ef5350',
        position: 1
      },
      {
        id: 1,
        name: 'Eau',
        color: '#42a5f5',
        position: 2
      },
      {
        id: 2,
        name: 'Plante',
        color: '#66bb6a',
        position: 3
      },
      {
        id: 3,
        name: 'Insecte',
        color: '#8d6e63',
        position: 4
      },
      {
        id: 4,
        name: 'Normal',
        color: '#eeeeee',
        position: 5
      },
      {
        id: 5,
        name: 'Vol',
        color: '#90caf9',
        position: 5
      },
      {
        id: 6,
        name: 'Poison',
        color: '#b388ff',
        position: 6
      },
      {
        id: 7,
        name: 'Fée',
        color: '#f8bbd0',
        position: 7
      },
      {
        id: 8,
        name: 'Psy',
        color: '#512da8',
        position: 8
      },
      {
        id: 9,
        name: 'Electrik',
        color: '#f4ff81',
        position: 9
      },
      {
        id: 10,
        name: 'Combat',
        color: '#fbe9e7',
        position: 10
      }
    ];

    return ret;
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