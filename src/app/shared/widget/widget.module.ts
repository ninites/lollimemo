import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegButtonComponent } from './reg-button/reg-button.component';
import { ModalComponent } from './modal/modal.component';
import { TimerComponent } from './timer/timer.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    AlertComponent
  ],
  imports: [CommonModule],
  exports: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    AlertComponent
  ],
})
export class WidgetModule {}
