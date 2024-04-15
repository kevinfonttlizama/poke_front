import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() onCapture = new EventEmitter<any>();
  @Output() onRelease = new EventEmitter<any>();

  toggleCapture(): void {
    if (this.pokemon.estado_de_captura === 'capturado') {
      this.onRelease.emit(this.pokemon);
    } else {
      this.onCapture.emit(this.pokemon);
    }
  }
}
