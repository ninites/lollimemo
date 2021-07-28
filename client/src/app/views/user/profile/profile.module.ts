import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    CoreModule,
    SwiperModule,
  ],
})
export class ProfileModule {}
