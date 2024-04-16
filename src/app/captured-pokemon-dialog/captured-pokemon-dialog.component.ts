import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captured-pokemon-dialog',
  templateUrl: './captured-pokemon-dialog.component.html',
  styleUrls: ['./captured-pokemon-dialog.component.css'],
  standalone: true,
  imports : [MatDialogModule, MatListModule, CommonModule]
})
export class CapturedPokemonDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { pokemons: any[] }) {}
}
