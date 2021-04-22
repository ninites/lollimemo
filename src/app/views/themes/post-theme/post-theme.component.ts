import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-theme',
  templateUrl: './post-theme.component.html',
  styleUrls: ['./post-theme.component.scss'],
})
export class PostThemeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  postThemeForm = this.fb.group({
    name: ['', [Validators.minLength(2), Validators.required]],
    pictures: [[], [Validators.required, Validators.minLength(10)]],
  });

  buttonLabel: string = 'Valider';

  pictureDelete(pictureId: number): void {
    const result = [...this.postThemeForm.value.pictures].filter(
      (pic, index) => {
        return index !== pictureId;
      }
    );
    this.postThemeForm.patchValue({ pictures: [...result] });
  }

 
  ngOnInit(): void {}
}
