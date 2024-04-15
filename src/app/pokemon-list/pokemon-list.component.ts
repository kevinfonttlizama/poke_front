import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent], 
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  currentPokemon: any = null;
  currentIndex = 0;
  pokemons = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons({ page: 1 })  // Pass default parameter
      .subscribe({
        next: (data) => {
          this.pokemons = data;
          if (this.pokemons.length > 0) {
            this.currentPokemon = this.pokemons[0];
            this.currentIndex = 0;
          }
        },
        error: (err) => {
          console.error('Failed to load pokemons', err);
          this.pokemons = []; 
        }
      });
  }

  nextPage(): void {
    if (this.currentIndex < this.pokemons.length - 1) {
      this.currentIndex++;
      this.currentPokemon = this.pokemons[this.currentIndex];
    }
  }

  previousPage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPokemon = this.pokemons[this.currentIndex];
    }
  }
}
