import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { concatAll, filter, map, mergeAll, switchMap } from 'rxjs/operators';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { CropModalService } from 'src/app/shared/top/crop-modal/crop-modal.service';
import { SearchModalService } from 'src/app/shared/top/search-modal/search-modal.service';
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

  constructor(
    private cropModal: CropModalService,
    private readonly alert: AlertService,
    private searchModal: SearchModalService,
    private request: RequestService
  ) { }

  cardBackStyle: { [key: string]: any } = {};
  cardsPreview: { [key: string]: any }[] = [];
  cardsPreviewNotPosted: { [key: string]: any }[] = [];
  cardBackChange: boolean = false;
  picturesChange: boolean = false;
  uploadChoice = {
    cardBack: false,
    pictures: false,
  };
  isLoading: { [key: string]: any } = {
    cardBack: false,
    pictures: false,
    deletePicture: [],
  };
  searchModalSub: Subscription = this.searchModal.userSelection$.subscribe();

  ngOnInit(): void {
    this.getCardBack();
    this.cardsPreview = this.getPreview(this.theme.images);
    this.formHandler();
    this.searchModalHandler();
  }

  ngOnDestroy(): void {
    this.searchModalSub.unsubscribe();
  }

  searchModalHandler(): void {
    this.searchModalSub = this.searchModal.userSelection$.subscribe((files) => {
      this.themePutForm.patchValue({
        [files.type]: files.payload,
      });

      this.uploadChoice = {
        cardBack: false,
        pictures: false,
      };
    });
  }

  openGsearch(type: string): void {
    this.searchModal.setInfo({
      type: type + this.themeIndex,
      maxChoice: type === 'cardBack' ? 1 : 0,
      opacity: 0.6,
      inputPlaceHolder: 'Rechercher des Images',
    });
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
        this.uploadChoice = {
          cardBack: false,
          pictures: false,
        };
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
        this.uploadChoice = {
          cardBack: false,
          pictures: false,
        };
      });
  }

  getCardBack(): void {
    const cardback = this.theme.images.filter(
      (images: { [key: string]: string }) => images.type === 'cardBack'
    );
    if (cardback.length !== 0)
      this.changeCardBackPreview(cardback[0].path);
  }

  getPreview(array: any): { [key: string]: any }[] {
    const result: any = [];
    const cardsPreview = array.filter(
      (images: { [key: string]: string }) => images.type === 'themePic'
    );
    cardsPreview.forEach((preview: { [key: string]: string }) => {
      this.isLoading.deletePicture.push({ [preview.id]: false });
      result.push({ file: preview.path, id: preview._id });
    });
    return result;
  }

  delete(): void {
    this.onDelete.emit(this.theme._id);
  }

  deleteCard(type: string, index: number) {
    if (type === 'notPosted') this.deleteNotPostedPrev(index);
    if (type === 'posted') this.deletePostedCard(index);
  }

  deletePostedCard(id: number): void {
    if (this.cardsPreview.length <= 10) {
      this.alert.message = 'Vous ne pouvez pas avoir moins de 10 cartes';
      this.alert.switchAlert();
      return;
    }
    this.isLoading.deletePicture[id] = true;
    this.request.delete('images/' + this.theme._id + '/' + id).subscribe({
      next: (response) => {
        this.cardsPreview = this.cardsPreview.filter((card) => card.id !== id);
        this.isLoading.deletePicture[id] = false;
        this.alert.message = 'Carte correctement retirée';
        this.alert.switchAlert();
      },
      error: (err) => {
        if (err.error) {
          this.alert.message = err.error;
          this.alert.switchAlert();
        }
      },
    });
  }

  deleteNotPostedPrev(index: number): void {
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

  postNewCards(type: string): void {
    if (type === 'notPosted') this.addNotPosted();
    if (type === 'posted') this.editPosted();
  }

  editPosted(): void {
    this.isLoading.cardBack = true;
    const newPic = this.themePutForm.value['cardBack' + this.themeIndex];
    const payload = new FormData();
    payload.append('cardBack', newPic[0]);

    this.request.put('themes/' + this.theme._id, payload).subscribe({
      next: (resp) => {
        this.cardBackChange = false;
        this.themePutForm.patchValue({
          ['cardBack' + this.themeIndex]: [],
        });
        this.isLoading.cardBack = false;
      },
      error: (err) => { },
    });
  }

  addNotPosted(): void {
    this.isLoading.pictures = true;
    const newPics = this.themePutForm.value['pictures' + this.themeIndex];
    const payload = new FormData();
    newPics.forEach((pic: any) => {
      payload.append('pictures', pic);
    });
    this.request.put('themes/' + this.theme._id, payload).subscribe({
      next: (resp) => {
        this.cardsPreviewNotPosted = [];
        this.themePutForm.patchValue({
          ['pictures' + this.themeIndex]: [],
        });
        this.cardsPreview = this.getPreview(resp.images);
        this.isLoading.pictures = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
