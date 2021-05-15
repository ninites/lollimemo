import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthentificationService } from 'src/app/core/services/auth/authentification.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { FormValidation } from 'src/app/interface/interface';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { SetupService } from '../setup-service/setup.service';

@Component({
  selector: 'app-players-name',
  templateUrl: './players-name.component.html',
  styleUrls: ['./players-name.component.scss'],
})
export class PlayersNameComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private fb: FormBuilder,
    private gameParams: GameParametersService,
    private setupServ: SetupService,
    private alert: AlertService,
    private auth: AuthentificationService,
    private request: RequestService
  ) {}

  maxNumberOfPlayer: number = 1;
  userForm = this.fb.group({
    aliases: this.fb.array([this.fb.control('')]),
  });
  formValidation: FormValidation[] = [
    {
      isMinlength: false,
      isSubmited: false,
    },
  ];
  validate$ = new BehaviorSubject(this.formValidation);
  btnValidation: boolean = true;
  isAuth: boolean = false;

  ngOnInit(): void {
    this.maxNumberOfPlayer = this.gameParams.numberOfPlayer;
    this.setupServ.setIndexInChildren();
    this.setRegisteredPlayers();
    this.useEffectForValidation();
    this.validate$.next(this.formValidation);
    this.inputHandler();
    this.getUserInfo();
  }

  ngOnDestroy() : void {
    this.validate$.unsubscribe()
  }

  getUserInfo(): void {
    this.auth.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      if (isAuth) {
        this.request.get('users/info').subscribe((response) => {
          this.aliases.patchValue([response.username]);
        });
      }
    });
  }

  useEffectForValidation(): void {
    this.validate$.subscribe({
      next: (resp) => {
        const allFormValid = this.formValidationVerification(resp);
        if (allFormValid) {
          this.setupServ.displayPathButton();
          this.setupServ.setDisableDots();
        } else {
          this.setupServ.setDisableButtons([false, true]);
          this.setupServ.setDisableDots();
        }
      },
    });
  }

  inputHandler() {
    this.userForm.valueChanges.subscribe({
      next: (resp) => {
        const { aliases } = resp;
        aliases.forEach((alias: string, index: number) => {
          this.formValidation[index].isMinlength = alias.length > 2 && true;
        });
        this.validate$.next(this.formValidation);
        this.btnValidation = true;
      },
    });
  }

  onSubmit(index: number): void {
    const checkState = this.formValidation[index].isSubmited;
    checkState ? this.modifyUserName(index) : this.sendUserName();
  }

  modifyUserName(userToModifyIndex: number) {
    this.gameParams.modifyUserName(
      userToModifyIndex,
      this.aliases.value[userToModifyIndex]
    );
    this.addPlayerInput();
    const alertUserIndex =
      typeof userToModifyIndex === 'string' && parseInt(userToModifyIndex) + 1;

    this.alert.message = `Le nom du joueur ${alertUserIndex} a bien ete modifie en ${this.aliases.value[userToModifyIndex]} `;
    this.alert.switchAlert();
    this.btnValidation = false;
  }

  sendUserName(): void {
    const lastWrittenName = this.aliases.value.length - 1;
    const dontOverrideArray =
      this.formValidation.length <= this.maxNumberOfPlayer;

    if (dontOverrideArray) {
      this.formValidation[lastWrittenName].isSubmited = true;
      this.gameParams.postPlayerName(this.aliases.value[lastWrittenName]);
      this.btnValidation = false;
    }
    this.addPlayerInput();
  }

  addPlayerInput(): void {
    const playersNameInputs = this.aliases.length;

    if (playersNameInputs < this.maxNumberOfPlayer) {
      this.formValidation.push({
        isMinlength: false,
        isSubmited: false,
      });
      this.aliases.push(this.fb.control(''));
    }
    this.validate$.next(this.formValidation);
  }

  setRegisteredPlayers(): void {
    if (this.gameParams.players.length > 0) {
      this.aliases.removeAt(0);
      this.formValidation = [];
      const players = this.gameParams.players;

      for (let index = 0; index < this.gameParams.numberOfPlayer; index++) {
        if (players[index]?.username) {
          this.aliases.push(this.fb.control(players[index].username));
          this.formValidation.push({ isSubmited: true, isMinlength: true });
          this.btnValidation = false;
        }
      }
    }
  }

  formValidationVerification(fromToVerify: FormValidation[]): boolean {
    let result = fromToVerify
      .map((input) => {
        return Object.values(input).filter((value) => value === false);
      })
      .reduce((acc, value) => acc.concat(value));

    return (
      result.length === 0 &&
      fromToVerify.length === this.gameParams.numberOfPlayer
    );
  }

  get aliases() {
    return this.userForm.get('aliases') as FormArray;
  }
}
