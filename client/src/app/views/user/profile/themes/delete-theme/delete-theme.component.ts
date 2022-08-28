import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { BigSpinnerService } from 'src/app/shared/top/big-spinner/big-spinner.service';
@Component({
  selector: 'delete-theme',
  templateUrl: './delete-theme.component.html',
  styleUrls: ['./delete-theme.component.scss'],
})
export class DeleteThemeComponent implements OnInit {
  constructor(
    private request: RequestService,
    private alert: AlertService,
    private fb: UntypedFormBuilder,
    private gameParams: GameParametersService,
    private bigSpinner : BigSpinnerService
  ) {}
  @Input() themeIndex: any;
  @Output() themeIndexChange = new EventEmitter<number>();
  @Output() themeLength = new EventEmitter<number>();

  userThemes: { [key: string]: any }[] = [];
  themesPutForm = this.fb.group({});
  isLoading : boolean = false


  ngOnInit(): void {
    this.getThemes();
    this.bigSpinner.show('getThemes')
  }

  onSwiper(event: any): void {
    this.themeIndexChange.emit(event.realIndex + 1);
  }

  onSwiperStart(event: any): void {
    this.themeIndexChange.emit(event.realIndex + 1);
  }

  delete(themeId: string): void {
    this.isLoading = true
    this.request.delete('themes/' + themeId).subscribe({
      next: (resp) => {
        this.userThemes = this.userThemes.filter(
          (theme) => theme._id !== resp._id
        );
        this.gameParams.setTheme({});
        this.isLoading = false
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
        this.createForms(resp);
        this.bigSpinner.hide('getThemes')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createForms(themes: any): void {
    let themesObject = {};
    themes.forEach((theme: any, index: number) => {
      themesObject = {
        ...themesObject,
        ['theme' + index]: this.fb.group({
          ['cardBack' + index]: [[]],
          ['pictures' + index]: [[]],
        }),
      };
    });
    this.themesPutForm = this.fb.group(themesObject);
  }

  trackByFn(index: number, element: any) {
    return element._id;
  }
}
