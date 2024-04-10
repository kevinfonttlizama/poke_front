import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.http.get<any>('http://127.0.0.1:3000/pokemon').subscribe(
      (response) => {
        this.pokemons = response.pokemons;
      },
      (error) => {
        console.error('Error fetching Pokemon data:', error);
      }
    );
  }
}
