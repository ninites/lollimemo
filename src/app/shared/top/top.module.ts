import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlertComponent, HeaderComponent],
  imports: [SharedModule, RouterModule],
  exports: [AlertComponent, HeaderComponent],
})
export class TopModule {}
