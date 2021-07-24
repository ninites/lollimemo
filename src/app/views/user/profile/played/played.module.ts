import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayedRoutingModule } from './played-routing.module';
import { PlayedMainComponent } from './played-main/played-main.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PlayedMainComponent],
  imports: [
    CommonModule,
    SharedModule,
    PlayedRoutingModule
  ]
})
export class PlayedModule { }
