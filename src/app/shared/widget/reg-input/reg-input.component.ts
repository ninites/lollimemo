import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
@Component({
  selector: 'reg-input',
  templateUrl: './reg-input.component.html',
  styleUrls: ['./reg-input.component.scss'],
})
export class RegInputComponent implements OnInit {
  @Input() parentForm: any;
  @Input() parentControlName?: any;
  @Input() disabled: boolean = false;
  @Input() width: number = 0;
  @Input() placeholder: string = '';
  @Input() validate: boolean = false;
  @Input() solo: boolean = true;
  @Input() type: string = 'text';

  style: {} = {};
  displayEye: boolean = false;
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {    
    this.displayEye = this.type === 'password' && true;
    this.parentForm = this.controlContainer.control;
  }

  changeType(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  ngOnChanges(): void {
    this.style = {
      width: this.width + 'px',
    };
  }
}
