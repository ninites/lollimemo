import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { environment } from 'src/environments/environment';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-select-themes',
  templateUrl: './select-themes.component.html',
  styleUrls: ['./select-themes.component.scss'],
})
export class SelectThemesComponent implements OnInit {
  constructor(
    private setupServ: SetupService,
    private request: RequestService,
    private gameParams: GameParametersService
  ) {}

  userTheme = [];
  themesName: string[] = [];
  choosenTheme: string = '';
  themeImgSrc: string = '';
  userSelection: string = '';
  validation$: BehaviorSubject<any> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.setupServ.setIndexInChildren();
    this.getThemes();
    this.getSavedValue();
    this.checkValidation();
  }

  checkValidation(): void {
    this.validation$.subscribe((valid) => {
      if (valid) {
        this.setupServ.displayPathButton();
        this.setupServ.setDisableDots();
      } else {
        this.setupServ.setDisableButtons([false, true]);
        this.setupServ.setDisableDots();
      }
    });
  }

  setSelection(): void {
    this.userSelection = this.choosenTheme;
    const themeChoice = this.userTheme.find(
      (theme: { [key: string]: any }) => theme.name === this.userSelection
    );
    if (themeChoice) this.gameParams.setTheme(themeChoice);
    this.validation$.next(true);
  }

  onChange(): void {
    this.userSelection = '';
    this.validation$.next(false);
    const choosenTheme: any = this.userTheme.filter(
      (theme: any) => theme.name === this.choosenTheme
    );

    const cardBack = choosenTheme[0].images.filter(
      (image: any) => image.type === 'cardBack'
    );

    this.themeImgSrc = environment.proxy + cardBack[0].path;
  }

  getThemes(): void {
    this.request.get('themes/all').subscribe({
      next: (resp) => {
        this.userTheme = resp;
        resp.forEach((theme: any) => {
          this.themesName.push(theme.name);
        });
      },
    });
  }

  getSavedValue(): void {
    const paramsValue = this.gameParams.selectedTheme.name
      ? this.gameParams.selectedTheme.name
      : '';
    this.userSelection = paramsValue;
    this.choosenTheme = paramsValue;
    if (paramsValue) this.validation$.next(true);
  }
}
