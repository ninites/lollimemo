import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-played-main',
  templateUrl: './played-main.component.html',
  styleUrls: ['./played-main.component.scss'],
})
export class PlayedMainComponent implements OnInit {
  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.request.get('games').subscribe(console.log);
  }
}
