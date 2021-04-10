import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegButtonComponent } from './reg-button/reg-button.component';
import { ModalComponent } from './modal/modal.component';
import { TimerComponent } from './timer/timer.component';
import { AlertComponent } from './alert/alert.component';
import { DotsComponent } from './dots/dots.component';
import { InfoPopComponent } from './info-pop/info-pop.component';
import { RegInputComponent } from './reg-input/reg-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    AlertComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    AlertComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
  ],
})
export class WidgetModule {}
