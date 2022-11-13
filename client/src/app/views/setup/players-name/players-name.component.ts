import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/core/services/auth/authentification.service';
import { GameParametersService } from 'src/app/core/services/game-parameters.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UsersService } from 'src/app/core/services/users/users.service';
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
    private fb: UntypedFormBuilder,
    private gameParams: GameParametersService,
    private setupServ: SetupService,
    private alert: AlertService,
    private auth: AuthentificationService,
    private request: RequestService,
    private readonly usersService: UsersService
  ) { }

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
  validationSubscription: Subscription = this.validate$.subscribe();
  btnValidation: boolean = true;
  isAuth: boolean = false;
  isLoading: boolean = false;
  profilePictures: any = {
    main: "",
    other: ""
  }

  ngOnInit(): void {
    this.maxNumberOfPlayer = this.gameParams.numberOfPlayer;
    this.setupServ.setIndexInChildren();
    this.setRegisteredPlayers();
    this.useEffectForValidation();
    this.validate$.next(this.formValidation);
    this.inputHandler();
    this.getAuthStatus()
    this.getUsersInfo();
  }

  ngOnDestroy(): void {
    this.validationSubscription.unsubscribe();
  }

  getAuthStatus() {
    this.auth.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  getUsersInfo(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: ({ mainUser, otherUser }) => {
        const gotOtherUser = Object.keys(otherUser).length > 0
        this.aliases.patchValue([mainUser.username]);
        this.profilePictures.main = mainUser.profilePicURL
        if (gotOtherUser) {
          this.addPlayerInput(otherUser.username)
          this.profilePictures.other = otherUser.profilePicURL
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  useEffectForValidation(): void {
    this.validationSubscription = this.validate$.subscribe({
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
          if (alias) {
            this.formValidation[index].isMinlength = alias.length > 2 && true;
          }
        });
        this.validate$.next(this.formValidation);
        this.btnValidation = true;
      },
    });
  }

  onSubmit(index: number): void {
    const checkState = this.formValidation[index].isSubmited;
    const userProfilePic = Object.values(this.profilePictures)[index]
    checkState ? this.modifyUserName(index) : this.sendUserName(userProfilePic);
  }

  modifyUserName(userToModifyIndex: number) {
    this.gameParams.modifyUserName(
      userToModifyIndex,
      this.aliases.value[userToModifyIndex]
    );
    this.addPlayerInput();

    const alertUserIndex = userToModifyIndex + 1;

    this.alert.message = `Le nom du joueur ${alertUserIndex} a bien ete modifie en ${this.aliases.value[userToModifyIndex]} `;
    this.alert.switchAlert();
    this.btnValidation = false;
  }

  sendUserName(userProfilePic: any): void {
    const lastWrittenName = this.aliases.value.length - 1;
    const dontOverrideArray =
      this.formValidation.length <= this.maxNumberOfPlayer;

    if (dontOverrideArray) {
      this.formValidation[lastWrittenName].isSubmited = true;
      this.gameParams.postPlayerName(this.aliases.value[lastWrittenName], userProfilePic);
      this.btnValidation = false;
    }
    this.addPlayerInput();
  }

  addPlayerInput(playerName = ""): void {
    const playersNameInputs = this.aliases.length;

    if (playersNameInputs < this.maxNumberOfPlayer) {
      this.formValidation.push({
        isMinlength: false,
        isSubmited: false,
      });
      this.aliases.push(this.fb.control(playerName));
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
    return this.userForm.get('aliases') as UntypedFormArray;
  }
}
