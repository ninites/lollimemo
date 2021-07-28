import { Component, Input, OnInit } from '@angular/core';
import { opacityAnim } from 'src/app/animations/animations';

@Component({
  selector: 'reg-spinner',
  templateUrl: './reg-spinner.component.html',
  styleUrls: ['./reg-spinner.component.scss'],
  animations : [opacityAnim]
})
export class RegSpinnerComponent implements OnInit {

  @Input() size: number = 40;
  @Input() isDisplayed : boolean = true

  style: { [key: string]: any } = {};

  constructor() { }

  ngOnInit(): void {
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
    };

  }

}
