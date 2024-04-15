// src/app/pokemon-card/pokemon-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
HttpClientModule

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon: any;
}
