// src/app/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(params: any): Observable<any> {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });

    return this.http.get<any>(this.apiUrl, { params: queryParams });
  }
}
