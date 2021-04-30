import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SubscribeComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
