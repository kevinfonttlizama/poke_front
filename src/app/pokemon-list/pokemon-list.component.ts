// src/app/pokemon-list/pokemon-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent],  // Include PokemonCardComponent here
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];  // Ensure this is initialized as an empty array
  currentPage = 1;
  totalPages = 10;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }
  loadPokemons(): void {
    this.pokemonService.getPokemons({ page: this.currentPage }).subscribe({
      next: (pokemons) => {  // Directly use pokemons if API just returns an array
        this.pokemons = pokemons;
        this.totalPages = Math.ceil(pokemons.length / 20); // Example if 20 per page
      },
      error: (err) => {
        console.error('Failed to load pokemons', err);
        this.pokemons = []; // Ensure it's an array even on error
      }
    });
  }
  
  

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }
}
