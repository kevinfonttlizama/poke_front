// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent, pathMatch: 'full' }
];

export const AppRoutesModule = RouterModule.forRoot(routes);
