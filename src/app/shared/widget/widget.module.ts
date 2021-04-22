import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegButtonComponent } from './reg-button/reg-button.component';
import { ModalComponent } from './modal/modal.component';
import { TimerComponent } from './timer/timer.component';
import { DotsComponent } from './dots/dots.component';
import { InfoPopComponent } from './info-pop/info-pop.component';
import { RegInputComponent } from './reg-input/reg-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegSelectComponent } from './reg-select/reg-select.component';
import { RegFileComponent } from './reg-file/reg-file.component';
import { PicturesPreviewComponent } from './pictures-preview/pictures-preview.component';

@NgModule({
  declarations: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
    RegSelectComponent,
    RegFileComponent,
    PicturesPreviewComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    RegButtonComponent,
    ModalComponent,
    TimerComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
    RegSelectComponent,
    RegFileComponent,
    PicturesPreviewComponent,
  ],
})
export class WidgetModule {}
