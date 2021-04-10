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

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.parentForm = this.controlContainer.control;
  }
}
