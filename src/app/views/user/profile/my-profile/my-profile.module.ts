import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ModifyProfileComponent } from './modify-profile/modify-profile/modify-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModifyProfileComponent],
  imports: [CommonModule, MyProfileRoutingModule, SharedModule, CoreModule],
})
export class MyProfileModule {}
