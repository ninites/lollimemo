import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CropModalComponent } from './crop-modal/crop-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [AlertComponent, NavBarComponent, CropModalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ImageCropperModule,
    SwiperModule,
  ],
  exports: [AlertComponent, NavBarComponent, CropModalComponent],
})
export class TopModule {}
