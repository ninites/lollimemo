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

  style: {} = {};
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.parentForm = this.controlContainer.control;    
  }

  ngOnChanges(): void {
    this.style = {
      width: this.width + 'px',
    };
  }
}
