import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { AlertComponent } from './alert/alert.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [AlertComponent,  NavBarComponent],
  imports: [SharedModule, RouterModule],
  exports: [AlertComponent, NavBarComponent],
})
export class TopModule {}
