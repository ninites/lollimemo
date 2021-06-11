import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CropModalService } from 'src/app/shared/top/crop-modal/crop-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'delete-theme-item',
  templateUrl: './delete-theme-item.component.html',
  styleUrls: ['./delete-theme-item.component.scss'],
})
export class DeleteThemeItemComponent implements OnInit {
  @Input() theme: { [key: string]: any } = {};
  @Input() themePutForm: any;
  @Input() themeIndex: number = 0;
  @Output() onDelete = new EventEmitter();

  constructor(private cropModal: CropModalService) {}

  cardBackStyle: { [key: string]: any } = {};
  cardsPreview: { [key: string]: any }[] = [];
  cardBackChange: boolean = false;

  ngOnInit(): void {
    this.getCardBack();
    this.getPreview();
    this.formHandler();
    this.cropHandler();
  }

  formHandler(): void {
    this.cardBackFormHandler();
  }

  cardBackFormHandler(): void {
    this.themePutForm.valueChanges
      .pipe(
        filter((response: any) => response['cardBack' + this.themeIndex]),
        switchMap((file: any) => {
          return this.readData(file['cardBack' + this.themeIndex][0]);
        })
      )
      .subscribe((file: any) => {
        this.changeCardBackPreview(file.target.result);
        this.cardBackChange = true;
      });
  }

  cropHandler(): void {
    this.cropModal.cropResults$
      .pipe(
        filter((result) => result.payload),
        switchMap((result) => this.readData(result.payload[0]))
      )
      .subscribe((result: any) => {
        this.changeCardBackPreview(result.target.result);
        this.cardBackChange = true;
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

  displayCrop(incoming: string): void {
    const finalIncoming = incoming + this.themeIndex;
    this.cropModal.setInfo({
      props: {
        type: finalIncoming,
        pictures: this.themePutForm.value[finalIncoming],
        opacity: 0.6,
        closeOnClick: false,
      },
    });
    this.cropModal.switch();
  }
}
