// src/app/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  capturePokemon(pokemonId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${pokemonId}/capture`, {});
  }

  releasePokemon(pokemonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${pokemonId}/release`);
  }

  importPokemons(): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, {});
  }
}
