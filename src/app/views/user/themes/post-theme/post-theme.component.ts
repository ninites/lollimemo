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
  picturesLengthAlert: number = 0;
  displaySideMenu: boolean = false;

  pictureChangeHandler(): void {
    this.postThemeForm.valueChanges
      .pipe(
        filter((values) => {
          return values.pictures.length !== this.picturesLengthAlert;
        })
      )
      .subscribe(() => {
        this.picturesLengthAlert = this.postThemeForm.value.pictures.length;
        this.alert.message = `${this.postThemeForm.value.pictures.length} images sont disponibles dans en preview dans le menu`;
        this.alert.switchAlert();
      });
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
    this.request.post('themes/', payload).subscribe(console.log);
  }

  ngOnInit(): void {
    this.pictureChangeHandler();
  }
}
