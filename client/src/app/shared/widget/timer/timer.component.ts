import { Component, OnInit } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  constructor(public timer : TimerService) {}

  ngOnInit(): void {   
  }

  ngOnDestroy() : void {
    this.timer.resetTimer()
  }
}
