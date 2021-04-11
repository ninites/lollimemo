import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AlertComponent, HeaderComponent],
  imports: [CommonModule, SharedModule],
  exports: [AlertComponent, HeaderComponent],
})
export class TopModule {}
