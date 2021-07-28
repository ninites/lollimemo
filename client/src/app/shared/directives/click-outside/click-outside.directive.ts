import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elRef: ElementRef) {}

  @Input() exceptions: any = [];

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event']) onClick(event: any): void {
    const except = this.exceptions.map((ex: string) => {
      return document.querySelector(`#clickOutside_${ex}`);
    });
    except.push(this.elRef.nativeElement);

    const clickInside: boolean[] = [];
    except.forEach((element: HTMLElement) => {
      if (element && element.contains(event.target)) {
        clickInside.push(true);
      } else {
        clickInside.push(false);
      }
    });

    if (!clickInside.includes(true)) {
      this.clickOutside.emit();
    }
  }
}
