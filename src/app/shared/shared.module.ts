import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from './widget/widget.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, WidgetModule, DirectivesModule],
  exports: [WidgetModule, DirectivesModule],
})
export class SharedModule {}
