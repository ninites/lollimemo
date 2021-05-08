import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-post-theme',
  templateUrl: './post-theme.component.html',
  styleUrls: ['./post-theme.component.scss'],
})
export class PostThemeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private request: RequestService
  ) {}

  postThemeForm = this.fb.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    pictures: [[], [Validators.required, Validators.minLength(10)]],
    cardBack: [[], Validators.required],
  });

  buttonLabel: string = 'Valider';
  displaySideMenu: boolean = false;

  pictureChangeHandler(): void {
    this.postThemeForm.valueChanges.subscribe(() => {
      this.checkSame();
    });
  }

  checkSame(): void {
    const allPics = this.postThemeForm.value.pictures;
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
        this.alert.message = 'Un probleme à eu lieu pendant l ajout';
        this.alert.switchAlert();
      },
    });
  }

  ngOnInit(): void {
    this.pictureChangeHandler();
  }
}
