import { Component, Input, OnInit } from '@angular/core';
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

  style: { [key: string]: any } = {};

  constructor() {}

  ngOnInit(): void {
    this.style = {
      width: this.width + 'px',
      height: this.height + 'px',
      fontSize: this.fontSize + 'px',
    };
  }
}
