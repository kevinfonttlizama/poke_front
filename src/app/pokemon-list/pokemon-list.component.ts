import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PokemonService } from '../pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CapturedPokemonDialogComponent } from '../captured-pokemon-dialog/captured-pokemon-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule, 
    PokemonCardComponent, 
    MatButtonModule, 
    MatListModule,
    MatDialogModule
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

  constructor(private pokemonService: PokemonService, public dialog: MatDialog
    
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons({ page: 1 })
      .subscribe({
        next: (response) => {
          this.pokemons = response || [];  
          this.filteredPokemons = [...this.pokemons];
          this.updateDisplay();
        },
        error: (err) => console.error('Failed to load pokemons', err)
      });
  }

  importPokemons(): void {
    this.pokemonService.importPokemons().subscribe({
      next: () => {
        console.log('Pokémon imported successfully');
        this.loadPokemons();  // Reload pokemons after importing
      },
      error: (error) => console.error('Error importing Pokémon', error)
    });
  }

  handleCapture(pokemon: any): void {
    const foundIndex = this.capturedPokemons.findIndex(p => p.id === pokemon.id);
    if (foundIndex !== -1) {
      this.capturedPokemons.splice(foundIndex, 1);
    } else {
      if (this.capturedPokemons.length < 6) {
        this.capturedPokemons.push({...pokemon, estado_de_captura: 'capturado'}); 
      } else {
        alert('Maximum of 6 captured Pokémon at a time.');
      }
    }
    this.updatePokemonsList(pokemon); 
  }

  updatePokemonsList(updatedPokemon: any): void {
    this.pokemons = this.pokemons.map(pokemon =>
      pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
    );
    this.filteredPokemons = [...this.pokemons];  
  }

  updateDisplay(): void {
    this.currentPokemon = this.filteredPokemons.length > 0 ? this.filteredPokemons[0] : null;
    this.currentIndex = 0;
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
  showCapturedPokemons(): void {
    this.dialog.open(CapturedPokemonDialogComponent, {
      width: '250px',
      data: { pokemons: this.capturedPokemons }
    });
  }
openDialog(): void {
  this.dialog.open(CapturedPokemonDialogComponent, {
    width: '250px',
    data: { pokemons: this.capturedPokemons }
  });
}

}
