import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../pokemon.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,MatListModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() onToggleCapture = new EventEmitter<any>();

  constructor(private pokemonService: PokemonService) {}

  toggleCapture(): void {
    if (this.pokemon.estado_de_captura === 'capturado') {
      this.pokemonService.releasePokemon(this.pokemon.id).subscribe(() => {
        this.pokemon.estado_de_captura = 'no_capturado';
        this.onToggleCapture.emit(this.pokemon);
      });
    } else {
      this.pokemonService.capturePokemon(this.pokemon.id).subscribe(() => {
        this.pokemon.estado_de_captura = 'capturado';
        this.onToggleCapture.emit(this.pokemon);
      });
    }
  }
}