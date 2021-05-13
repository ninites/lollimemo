import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'delete-theme-item',
  templateUrl: './delete-theme-item.component.html',
  styleUrls: ['./delete-theme-item.component.scss'],
})
export class DeleteThemeItemComponent implements OnInit {
  @Input() theme: { [key: string]: any } = {};
  @Output() onDelete = new EventEmitter();

  constructor() {}

  cardBackStyle: { [key: string]: any } = {};
  cardsPreview: { [key: string]: any }[] = [];

  ngOnInit(): void {
    this.getCardBack();
    this.getPreview();
  }

  getCardBack(): void {
    const cardback = this.theme.images.filter(
      (images: { [key: string]: string }) => images.type === 'cardBack'
    );
    this.cardBackStyle.backgroundImage = `url('${
      environment.proxy + cardback[0].path
    }')`;
  }

  getPreview(): void {
    const cardsPreview = this.theme.images.filter(
      (images: { [key: string]: string }) => images.type === 'themePic'
    );
    cardsPreview.forEach((preview: { [key: string]: string }) => {
      this.cardsPreview = [
        ...this.cardsPreview,
        { backgroundImage: `url('${environment.proxy + preview.path}')` },
      ];
    });
  }

  delete(): void {
    this.onDelete.emit(this.theme._id);
  }
}
