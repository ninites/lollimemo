import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'reg-button',
  templateUrl: './reg-button.component.html',
  styleUrls: ['./reg-button.component.scss'],
  animations: [popAnim],
})
export class RegButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
  @Input() id: any;
  @Input() width?: number;
  @Input() height?: number;
  @Input() selected?: boolean;
  @Input() fontSize?: number;
  @Input() solo: boolean = true;
  @Input() confirmation: boolean = false;

  style: { [key: string]: any } = {};

  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {
    this.style = {
      width: this.width + 'px',
      height: this.height + 'px',
      fontSize: this.fontSize + 'px',
    };
  }
}
