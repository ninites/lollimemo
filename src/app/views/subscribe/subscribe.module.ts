import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribeRoutingModule } from './subscribe-routing.module';
import { SubscribeComponent } from './subscribe/subscribe.component';


@NgModule({
  declarations: [SubscribeComponent],
  imports: [
    CommonModule,
    SubscribeRoutingModule
  ]
})
export class SubscribeModule { }
