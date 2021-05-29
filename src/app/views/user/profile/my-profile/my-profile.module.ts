import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ModifyProfileComponent } from './modify-profile/modify-profile/modify-profile.component';


@NgModule({
  declarations: [ModifyProfileComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule
  ]
})
export class MyProfileModule { }
