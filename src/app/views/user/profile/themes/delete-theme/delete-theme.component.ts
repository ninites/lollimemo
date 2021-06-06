import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
@Component({
  selector: 'delete-theme',
  templateUrl: './delete-theme.component.html',
  styleUrls: ['./delete-theme.component.scss'],
})
export class DeleteThemeComponent implements OnInit {
  constructor(
    private request: RequestService,
    private alert: AlertService,
    private fb: FormBuilder
  ) {}
  @Input() themeIndex: any;
  @Output() themeIndexChange = new EventEmitter<number>();
  @Output() themeLength = new EventEmitter<number>();

  userThemes: { [key: string]: any }[] = [];
  userThemesForm: { [key: string]: any }[] = [];

  ngOnInit(): void {
    this.getThemes();
  }

  onSwiper(event: any): void {
    this.themeIndexChange.emit(event.realIndex + 1);
  }

  onSwiperStart(event: any): void {
    this.themeIndexChange.emit(event.realIndex + 1);
  }

  delete(themeId: string): void {
    this.request.delete('themes/' + themeId).subscribe({
      next: (resp) => {
        this.userThemes = this.userThemes.filter(
          (theme) => theme._id !== resp._id
        );
        this.alert.message = 'Theme correctement supprimé';
        this.alert.switchAlert();
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }

  getThemes(): void {
    this.request.get('themes/all').subscribe({
      next: (resp) => {
        this.userThemes = resp;
        this.themeLength.emit(resp.length);
        this.createFormForThemes(resp);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createFormForThemes(themes: { [key: string]: any }[]): void {}
}
