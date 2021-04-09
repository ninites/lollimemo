import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameParamsValidGuard } from '../setup/setup-guard/game-params-valid.guard';
import { CardslistComponent } from './cardslist/cardslist.component';

const routes: Routes = [
  {
    path: '',
    component: CardslistComponent,
    canActivate: [GameParamsValidGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
