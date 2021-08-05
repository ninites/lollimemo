import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { popAnim } from 'src/app/animations/animations';

@Component({
  selector: 'reg-check-box',
  templateUrl: './reg-check-box.component.html',
  styleUrls: ['./reg-check-box.component.scss'],
  animations : [popAnim]
})
export class RegCheckBoxComponent implements OnInit {
  @Output() checkChange = new EventEmitter();
  constructor() {}

  isChecked: boolean = false;

  switchCheck(): void {
    this.isChecked = !this.isChecked;
    this.checkChange.emit(this.isChecked);
  }

  ngOnInit(): void {}
}
