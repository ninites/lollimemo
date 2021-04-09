import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { NumberOfPlayersComponent } from './number-of-players/number-of-players.component';
import { PlayersNameComponent } from './players-name/players-name.component';

import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },
  {
    path: '',
    component: SetupComponent,

    children: [
      { path: '', redirectTo: 'players', pathMatch: 'full' },
      {
        path: 'players',
        component: NumberOfPlayersComponent,
        data: { animation: 'Players' },
      },
      {
        path: 'names',
        component: PlayersNameComponent,
        data: { animation: 'Names' },
      },
      {
        path: 'difficulty',
        component: DifficultyComponent,
        data: { animation: 'Diff' },
      },
      { path: '**', redirectTo: 'players', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
