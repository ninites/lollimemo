import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardslistComponent } from './cardslist/cardslist.component';

const routes: Routes = [
  {
    path: '',
    component: CardslistComponent,   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
