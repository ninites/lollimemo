import { Component, Input, OnInit } from '@angular/core';
import { opacityAnim } from 'src/app/animations/animations';
import { BigSpinnerService } from './big-spinner.service';

@Component({
  selector: 'big-spinner',
  templateUrl: './big-spinner.component.html',
  styleUrls: ['./big-spinner.component.scss'],
  animations: [opacityAnim],
})
export class BigSpinnerComponent implements OnInit {
  constructor(private bigSpinner: BigSpinnerService) {}
  @Input() size: number = 40;

  style: { [key: string]: any } = {};
  isDisplayed: boolean = false;

  ngOnInit(): void {
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
    };

    this.bigSpinner.listen.subscribe((pendingList: string[]) => {
      this.isDisplayed = pendingList.length !== 0;
    });
  }
}
