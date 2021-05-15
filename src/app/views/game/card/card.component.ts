import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor() {}
  @Input() card?: any;
  @Input() cardBack?: string = '';
  @Output() displayCard = new EventEmitter<{}>();
  backroungImg: {} = {};
  rotation: {} = {};
  back: any = {};

  ngOnInit(): void {
   
    

    if (this.card) {
      this.backroungImg = {
        'background-image': `url('${
          this.card.download_url || environment.proxy + this.card.path
        }')`,
      };
    }
    if (this.cardBack) {
      this.back = {
        'background-image': `url('${this.cardBack}')`,
      };
    }
  }

  onClick(): void {
    if (this.card)
      this.displayCard.emit({ unique: this.card.uniqueId, id: this.card.id });
  }
}
