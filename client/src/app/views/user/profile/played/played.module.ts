import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayedRoutingModule } from './played-routing.module';
import { PlayedMainComponent } from './played-main/played-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { PlayedItemComponent } from './played-item/played-item.component';


@NgModule({
  declarations: [PlayedMainComponent, FilterBarComponent, PlayedItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    PlayedRoutingModule,
  ]
})
export class PlayedModule { }
