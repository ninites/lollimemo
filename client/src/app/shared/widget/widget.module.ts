import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegButtonComponent } from './reg-button/reg-button.component';
import { RegPopComponent } from './reg-pop/reg-pop.component';
import { TimerComponent } from './timer/timer.component';
import { DotsComponent } from './dots/dots.component';
import { InfoPopComponent } from './info-pop/info-pop.component';
import { RegInputComponent } from './reg-input/reg-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegSelectComponent } from './reg-select/reg-select.component';
import { RegFileComponent } from './reg-file/reg-file.component';
import { PicturesPreviewComponent } from './pictures-preview/pictures-preview.component';
import { DirectivesModule } from '../directives/directives.module';
import { RegSpinnerComponent } from './reg-spinner/reg-spinner.component';

@NgModule({
  declarations: [
    RegButtonComponent,
    RegPopComponent,
    TimerComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
    RegSelectComponent,
    RegFileComponent,
    PicturesPreviewComponent,
    RegSpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DirectivesModule],
  exports: [
    RegButtonComponent,
    RegPopComponent,
    TimerComponent,
    DotsComponent,
    InfoPopComponent,
    RegInputComponent,
    RegSelectComponent,
    RegFileComponent,
    PicturesPreviewComponent,
    RegSpinnerComponent,
  ],
})
export class WidgetModule {}
