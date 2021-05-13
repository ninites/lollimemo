import { Component, Input, OnInit } from '@angular/core';
import { popAnim } from 'src/app/animations/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'info-pop',
  templateUrl: './info-pop.component.html',
  styleUrls: ['./info-pop.component.scss'],
  animations: [popAnim],
})
export class InfoPopComponent implements OnInit {
  @Input() messages: { [key: string]: any } = {};
  @Input() displayed: boolean = false;
  @Input() width: number = 0;
  @Input() type: string = 'text';
  @Input() image: string = '';

  constructor() {}

  style: {} = {};
  imgMess: { [key: string]: any } = {};

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.style = {
      width: this.width + 'px',
      left: ((this.width - 25) / 2) * -1 + 'px',
    };

    this.imgMess.backgroundImage = `url('${environment.proxy + this.image}')`;
  }
}
