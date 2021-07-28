import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ModifyProfileComponent } from './modify-profile/modify-profile/modify-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ModifyPasswordComponent } from './modify-profile/modify-password/modify-password.component';
import { ModifyProfileLandingComponent } from './modify-profile/modify-profile-landing/modify-profile-landing.component';

@NgModule({
  declarations: [ModifyProfileComponent, ModifyPasswordComponent, ModifyProfileLandingComponent],
  imports: [CommonModule, MyProfileRoutingModule, SharedModule, CoreModule],
})
export class MyProfileModule {}
