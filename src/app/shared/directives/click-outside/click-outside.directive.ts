import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elRef: ElementRef) {
  }

  @HostListener('click', ['$event']) onClick(event: any): void {
    console.log(event);
  }
}
