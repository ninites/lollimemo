import { Component, Input, OnInit } from '@angular/core';
import { alertLeft } from 'src/app/animations/animations';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [alertLeft],
})
export class AlertComponent implements OnInit {
  constructor(public alert: AlertService) {}

  ngOnInit(): void {}

  closeAlert() {
    this.alert.isDisplayed = false;
  }

  ngOnDestroy() {}
}
