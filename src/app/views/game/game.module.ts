import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardslistComponent } from './cardslist/cardslist.component';
import { CardComponent } from './card/card.component';
import { WinBoxComponent } from './win-box/win-box.component';
import { FormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './player-info/player-info.component';

@NgModule({
  declarations: [CardslistComponent, CardComponent, WinBoxComponent, PlayerInfoComponent],
  imports: [CommonModule, GameRoutingModule, SharedModule, FormsModule],
})
export class GameModule {} 

