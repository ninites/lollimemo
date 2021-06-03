import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'delete-theme-item',
  templateUrl: './delete-theme-item.component.html',
  styleUrls: ['./delete-theme-item.component.scss'],
})
export class DeleteThemeItemComponent implements OnInit {
  @Input() theme: { [key: string]: any } = {};
  @Output() onDelete = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  cardBackStyle: { [key: string]: any } = {};
  cardsPreview: { [key: string]: any }[] = [];
  cardBackFrom = this.fb.group({
    cardBack: [''],
  });
  cardBackChange: boolean = false;

  ngOnInit(): void {
    this.getCardBack();
    this.getPreview();
    this.formHander();
  }

  formHander(): void {
    this.cardBackFrom.valueChanges.subscribe((resp) => {
      this.cardBackChange = resp.cardBack.length > 0 && true;
      if (this.cardBackChange) {
        const data$ = this.readData(resp.cardBack[0]);
        data$.subscribe((resp) => {
          this.changeCardBackPreview(resp.target.result)
        });
      }
    });
  }

  getCardBack(): void {
    const cardback = this.theme.images.filter(
      (images: { [key: string]: string }) => images.type === 'cardBack'
    );
    this.changeCardBackPreview(environment.proxy + cardback[0].path);
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

  changeCardBackPreview(path: string): void {
    this.cardBackStyle.backgroundImage = `url('${path}')`;
  }

  readData(file: any): Observable<any> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return fromEvent(reader, 'load');
  }
}
