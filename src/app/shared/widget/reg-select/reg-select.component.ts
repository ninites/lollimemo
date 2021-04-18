import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'reg-select',
  templateUrl: './reg-select.component.html',
  styleUrls: ['./reg-select.component.scss'],
  animations: [popAnim],
})
export class RegSelectComponent implements OnInit {
  @Input() values: string[] = [];
  @Input() choice: string = '';
  @Input() width: number = 0;
  @Output() choiceChange = new EventEmitter<string>();

  displayOptions: boolean = false;
  style: {} = {};

  constructor() {}

  sendValueToParent(value: string): void {
    this.choice = value;
    this.choiceChange.emit(this.choice);
  }

  ngOnInit(): void {
    this.style = {
      width: this.width + 'px',
    };
  }
}
