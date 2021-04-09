import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'reg-button',
  templateUrl: './reg-button.component.html',
  styleUrls: ['./reg-button.component.scss'],
})
export class RegButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
  @Input() id: any;

  constructor() {}

  ngOnInit(): void {
    
  }
}
