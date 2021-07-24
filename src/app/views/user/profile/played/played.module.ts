import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayedRoutingModule } from './played-routing.module';
import { PlayedMainComponent } from './played-main/played-main.component';


@NgModule({
  declarations: [PlayedMainComponent],
  imports: [
    CommonModule,
    PlayedRoutingModule
  ]
})
export class PlayedModule { }
