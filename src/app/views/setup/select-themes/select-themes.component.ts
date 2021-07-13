import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { popAnim } from 'src/app/animations/animations';
import { AuthentificationService } from 'src/app/core/services/auth/authentification.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { environment } from 'src/environments/environment';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-select-themes',
  templateUrl: './select-themes.component.html',
  styleUrls: ['./select-themes.component.scss'],
  animations: [popAnim],
})
export class SelectThemesComponent implements OnInit {
  constructor(
    private setupServ: SetupService,
    private request: RequestService,
    private gameParams: GameParametersService,
    private auth: AuthentificationService,
    private router: Router
  ) {}

  userTheme: { [key: string]: any }[] = [{ name: 'default', images: [] }];
  themesName: string[] = [];
  choosenTheme: string = '';
  userSelection: string = '';
  validation$: BehaviorSubject<any> = new BehaviorSubject(false);
  validationSubscription : Subscription = this.validation$.subscribe()
  style: { [key: string]: any } = {};
  isAuth: boolean = false;
  addThemeButton: { label: string; action: () => void }[] = [];

  ngOnInit(): void {
    this.setupServ.setIndexInChildren();
    this.getThemes();
    this.checkValidation();
    
  }

 

  checkValidation(): void {
    this.validationSubscription = this.validation$.subscribe((valid) => {      
      if (valid) {
        this.setupServ.displayPathButton();
        this.setupServ.setDisableDots();
      } else {
        this.setupServ.setDisableButtons([false, true]);
        this.setupServ.setDisableDots();
      }
    });
  }

  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
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
    const cardBack = this.getCardBack(this.userTheme);
    this.style.backgroundImage = cardBack
      ? `url('${environment.proxy + cardBack}')`
      : '';
  }

  getCardBack(theme: { [key: string]: any }): string {
    const choosenTheme: any = theme.filter(
      (theme: any) => theme.name === this.choosenTheme
    );

    const cardBack = choosenTheme[0].images.filter(
      (image: any) => image.type === 'cardBack'
    );

    return cardBack[0] ? cardBack[0].path : '';
  }

  getThemes(): void {
    this.request.get('themes/all').subscribe({
      next: (resp) => {
        const fullList = [...this.userTheme, ...resp];
        this.userTheme = fullList;
        fullList.forEach((theme: any) => {
          this.themesName.push(theme.name);
        });        
        this.getSavedValue();
        this.addThemeButton.push({
          label: '+ Ajouter un theme ',
          action: () => {
            this.router.navigateByUrl('user/profile/themes/post');
          },
        });
      },
      error: (err) => {
        this.userTheme.forEach((theme: any) => {
          this.themesName.push(theme.name);
        });
        this.getSavedValue();
      },
    });
  }

  getSavedValue(): void {
    const paramsValue = this.gameParams.selectedTheme.name
      ? this.gameParams.selectedTheme.name
      : '';

    const checkIfExists = this.userTheme.filter(
      (theme) => theme.name === paramsValue
    );

    if (checkIfExists.length === 0) {        
      this.validation$.next(false);
      return;
    }

    this.userSelection = paramsValue;
    this.choosenTheme = paramsValue;
    if (Object.keys(this.gameParams.selectedTheme).length !== 0) {
      const cardBack = this.getCardBack([this.gameParams.selectedTheme]);
      this.style.backgroundImage = cardBack
        ? `url('${environment.proxy + cardBack}')`
        : '';
    }
    if (paramsValue) this.validation$.next(true);
  }
}
