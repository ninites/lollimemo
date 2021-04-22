import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from './widget/widget.module';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WidgetModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WidgetModule, DirectivesModule],
})
export class SharedModule {}
