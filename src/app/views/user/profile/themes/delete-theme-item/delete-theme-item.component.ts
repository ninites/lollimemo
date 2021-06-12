import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { concatAll, filter, map, switchMap } from 'rxjs/operators';
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
        this.changeCardBackPreview(file.target.result);
        this.cardBackChange = true;
      });
  }

  picturesFormHandler(): void {
    this.themePutForm.valueChanges
      .pipe(
        map((response: any) => response['pictures' + this.themeIndex]),
        filter((response: any) => response.length > 0),
        map((files: any) => {
          const filesToUrl: any = [];
          files.forEach((file: any) => {
            const fileToURL$ = this.readData(file);
            filesToUrl.push(fileToURL$);
          });
          return combineLatest(filesToUrl);
        }),
        concatAll(),
        map((progresses: ProgressEvent[]) => {
          const result: string[] = [];
          progresses.forEach((progress: any) => {
            result.push(progress.target.result);
          });
          return result;
        })
      )
      .subscribe((picturesUrl: string[]) => {
        picturesUrl.forEach((url: string) => {
          this.cardsPreview = [
            ...this.cardsPreview,
            { backgroundImage: `url('${url}')`, notPost: true },
          ];
        });
      });
  }

  cardBackCropHandler(result: { [key: string]: any }): void {
    const picToURL$ = this.readData(result.payload[0]);
    picToURL$.subscribe((reader: any) => {
      this.changeCardBackPreview(reader.target.result);
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
        result: (result: { [key: string]: any }) => {
          if (result.type === 'cardBack' + this.themeIndex) {
            this.cardBackCropHandler(result);
          }
          if (result.type === 'pictures' + this.themeIndex) {
            console.log(result);
          }
        },
      },
    });
  }
}
