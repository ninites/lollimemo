import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { DifficultyComponent } from './difficulty/difficulty.component';
import { NumberOfPlayersComponent } from './number-of-players/number-of-players.component';
import { SetupComponent } from './setup/setup.component';
import { PlayersNameComponent } from './players-name/players-name.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DifficultyComponent,
    NumberOfPlayersComponent,
    SetupComponent,
    PlayersNameComponent,
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SetupModule {}
