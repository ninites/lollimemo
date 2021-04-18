import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopPropagationDirective } from './stop-propagation/stop-propagation.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';

@NgModule({
  declarations: [StopPropagationDirective, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [StopPropagationDirective, ClickOutsideDirective],
})
export class DirectivesModule {}
