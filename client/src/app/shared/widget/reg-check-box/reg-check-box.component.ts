import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'reg-check-box',
  templateUrl: './reg-check-box.component.html',
  styleUrls: ['./reg-check-box.component.scss'],
  animations: [popAnim],
})
export class RegCheckBoxComponent implements OnInit {
  @Output() checkChange = new EventEmitter();
  @Input() size: number = 30;
  constructor() {}

  isChecked: boolean = false;

  style: { [key: string]: any } = {};

  switchCheck(): void {
    this.isChecked = !this.isChecked;
    this.checkChange.emit(this.isChecked);
  }

  ngOnInit(): void {
    this.style = {
      height: this.size + 'px',
      width: this.size + 'px',
    };
  }
}
