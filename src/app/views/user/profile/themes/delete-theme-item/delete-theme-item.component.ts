import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { concatAll, filter, map, mergeAll, switchMap } from 'rxjs/operators';
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
  cardsPreviewNotPosted: { [key: string]: any }[] = [];
  cardBackChange: boolean = false;
  picturesChange: boolean = false;

  ngOnInit(): void {
    this.getCardBack();
    this.getPreview();
    this.formHandler();
  }

  formHandler(): void {
    this.cardBackFormHandler();
    this.picturesFormHandler();
  }

  cardBackFormHandler(): void {
    this.themePutForm.valueChanges
      .pipe(
        map((response: any) => response['cardBack' + this.themeIndex]),
        filter((response: any) => response.length > 0),
        switchMap((file: any) => {
          return this.readData(file[0]);
        })
      )
      .subscribe((file: any) => {
        this.changeCardBackPreview(file);
        this.cardBackChange = true;
      });
  }

  picturesFormHandler(): void {
    this.themePutForm.valueChanges
      .pipe(
        map((response: any) => response['pictures' + this.themeIndex]),
        filter((response: any) => response.length > 0)
      )
      .subscribe((files: any) => {
        this.cardsPreviewNotPosted = [...files];
        this.picturesChange = true;
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
        { file: environment.proxy + preview.path },
      ];
    });
  }

  delete(): void {
    this.onDelete.emit(this.theme._id);
  }

  deleteCard(type: string, index: number) {
    if (type === 'notPosted') this.deleteNotPostedPrev(index);
  }

  deleteNotPostedPrev(index: number) {
    this.cardsPreviewNotPosted = this.cardsPreviewNotPosted.filter(
      (card, i) => i !== index
    );
    this.themePutForm.patchValue({
      ['pictures' + this.themeIndex]: this.cardsPreviewNotPosted,
    });
  }

  changeCardBackPreview(path: string): void {
    this.cardBackStyle.backgroundImage = `url('${path}')`;
  }

  readData(file: any): Observable<any> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return fromEvent(reader, 'load').pipe(
      map((resp: any) => {
        return resp.target.result;
      })
    );
  }

  displayCrop(incoming: string): void {
    const finalIncoming = incoming + this.themeIndex;
    this.cropModal.setInfo({
      props: {
        type: finalIncoming,
        pictures: this.themePutForm.value[finalIncoming],
        opacity: 0.6,
        closeOnClick: false,
        result: (result: { [key: string]: any }) => {
          const { payload } = result;
          const type =
            result.type === 'cardBack' + this.themeIndex
              ? 'cardBack'
              : 'pictures';

          this.themePutForm.patchValue({
            [type + this.themeIndex]: payload,
          });
        },
      },
    });
  }
}
