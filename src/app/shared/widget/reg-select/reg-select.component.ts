import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'reg-select',
  templateUrl: './reg-select.component.html',
  styleUrls: ['./reg-select.component.scss'],
})
export class RegSelectComponent implements OnInit {
  @Input() values: string[] = [];
  @Input() choice: string = '';
  @Input() width: number = 0;
  @Output() choiceChange = new EventEmitter<string>();

  style: {} = {};

  constructor() {}

  sendValueToParent(): void {
    this.choiceChange.emit(this.choice);
  }

  ngOnInit(): void {
    this.style = {
      width: this.width + 'px',
    };
  }
}
