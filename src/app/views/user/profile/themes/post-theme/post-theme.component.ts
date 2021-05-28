import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { CropModalService } from 'src/app/shared/top/crop-modal/crop-modal.service';

@Component({
  selector: 'app-post-theme',
  templateUrl: './post-theme.component.html',
  styleUrls: ['./post-theme.component.scss'],
})
export class PostThemeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private request: RequestService,
    private cropModal: CropModalService
  ) {}

  postThemeForm = this.fb.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    cardBack: [[], Validators.required],
    pictures: [[], [Validators.required, Validators.minLength(10)]],
  });

  buttonLabel: string = 'Valider';
  displaySideMenu: boolean = false;
  pictureLengthTest: number = 0;
  pictureLengthPreviousValue: number = 0;

  ngOnInit(): void {
    this.pictureChangeHandler();
  }

  ngOnDestroy(): void {
    this.postThemeForm.reset();
  }

  pictureChangeHandler(): void {
    this.postThemeForm.valueChanges
      .pipe(
        map((result) => result.pictures),
        filter((type) => {
          if (!type) return false;
          if (type.length === this.pictureLengthPreviousValue) return false;
          this.pictureLengthPreviousValue = type.length;
          return type.length !== this.pictureLengthTest && true;
        })
      )
      .subscribe(() => {
        this.checkSame();
      });

    this.cropModal.cropResults$
      .pipe(filter((result) => result.payload))
      .subscribe((result: any) => {
        this.postThemeForm.patchValue({ [result.type]: result.payload });
      });
  }

  displayCrop(incoming: string): void {
    this.cropModal.setInfo({
      props: {
        type: incoming,
        pictures: this.postThemeForm.value[incoming],
        opacity: 0.6,
        closeOnClick: false,
      },
    });
    this.cropModal.switch();
  }

  checkSame(): void {
    const allPics = this.postThemeForm.value.pictures;
    if (!allPics) return;
    let dupli = [];
    dupli = allPics.map((picture: any, index: number, array: []) => {
      let duplicate = 0;
      array.forEach((pic: any) => {
        if (pic.name === picture.name) duplicate++;
      });
      if (duplicate > 1) {
        return 'doublon';
      } else {
        return;
      }
    });
    if (dupli.includes('doublon')) {
      this.alert.message =
        ' Attention vous avez mis plusieurs fois la meme image';
      this.alert.switchAlert();
    }
  }

  pictureDelete(pictureId: number, source: string): void {
    const result = [...this.postThemeForm.value[source]].filter(
      (pic, index) => {
        return index !== pictureId;
      }
    );
    this.postThemeForm.patchValue({ [source]: [...result] });
  }

  onSubmit(e: any): void {
    e.preventDefault();
    const { name, pictures, cardBack } = this.postThemeForm.value;
    const payload = new FormData();
    payload.append('name', name);
    payload.append('cardBack', cardBack[0]);
    pictures.forEach((picture: any) => {
      payload.append('pictures', picture);
    });
    this.request.post('themes/', payload).subscribe({
      next: (resp) => {
        this.alert.message = 'Theme correctement ajouté';
        this.alert.switchAlert();
        this.postThemeForm.reset();
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }
}
