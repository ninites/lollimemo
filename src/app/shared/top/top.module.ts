import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CropModalComponent } from './crop-modal/crop-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, NavBarComponent, CropModalComponent],
  imports: [CommonModule, SharedModule, RouterModule, ImageCropperModule],
  exports: [AlertComponent, NavBarComponent, CropModalComponent],
})
export class TopModule {}
