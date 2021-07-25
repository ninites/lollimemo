import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';

@NgModule({
  declarations: [SubscribeComponent, LoginComponent, RetrievePasswordComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
