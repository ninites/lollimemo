import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmallGameParamsGuard } from 'src/app/core/guards/small-game-params/small-game-params.guard';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { NumberOfPlayersComponent } from './number-of-players/number-of-players.component';
import { PlayersNameComponent } from './players-name/players-name.component';
import { SelectThemesComponent } from './select-themes/select-themes.component';

import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', redirectTo: 'players', pathMatch: 'full' },

  {
    path: '',
    component: SetupComponent,
    canActivate: [SmallGameParamsGuard],
    data : {
      routeConfig : ['players',"names","themes","difficulty"]
    },
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
        path: 'themes',
        component: SelectThemesComponent,
        data: { animation: 'Themes' },
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
