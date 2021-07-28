import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopPropagation]',
})
export class StopPropagationDirective {
  constructor() {}

  @HostListener('click', ['$event']) onClick(event: any): void {
    event.stopPropagation();
  }
}
