import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule, 
    PokemonCardComponent, 
    MatButtonModule, 
    MatListModule, 
    FormsModule,
    MatInputModule
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  currentPokemon: any = null;
  currentIndex = 0;
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  capturedPokemons: any[] = [];
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons({ page: 1 })
      .subscribe({
        next: (response) => {
          this.pokemons = response.pokemons || [];
          this.filteredPokemons = [...this.pokemons];
          this.updateDisplay();
        },
        error: (err) => console.error('Failed to load pokemons', err)
      });
  }

  handleCapture(pokemon: any): void {
    const isCaptured = this.capturedPokemons.find(p => p.id === pokemon.id);
    if (isCaptured) {
      this.capturedPokemons = this.capturedPokemons.filter(p => p.id !== pokemon.id);
      pokemon.estado_de_captura = false;
    } else {
      if (this.capturedPokemons.length < 6) {
        this.capturedPokemons.push(pokemon);
        pokemon.estado_de_captura = true;
      } else {
        this.capturedPokemons[0].estado_de_captura = false;
        this.capturedPokemons.shift();
        this.capturedPokemons.push(pokemon);
        pokemon.estado_de_captura = true;
      }
    }
  }

  updateDisplay(): void {
    if (this.filteredPokemons.length > 0) {
      this.currentPokemon = this.filteredPokemons[0];
      this.currentIndex = 0;
    } else {
      this.currentPokemon = null;
      this.currentIndex = -1;
    }
  }

  nextPage(): void {
    if (this.currentIndex < this.filteredPokemons.length - 1) {
      this.currentIndex++;
      this.currentPokemon = this.filteredPokemons[this.currentIndex];
    }
  }

  previousPage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPokemon = this.filteredPokemons[this.currentIndex];
    }
  }
}