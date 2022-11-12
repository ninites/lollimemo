import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';
import { RouteHistoryService } from 'src/app/core/services/route-history/route-history.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { UserInfo } from '../user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private request: RequestService,
    private router: Router,
    private routeHistory: RouteHistoryService,
    private alert: AlertService,
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) { }

  loginForm = this.fb.group({
    username: ['', [Validators.minLength(2), Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  htmlLoginForm = {};
  label: string[] = ["Nom d'utilisateur", 'Mot de passe'];
  isLoading: boolean = false;
  otherPlayer: boolean = false

  notSorted() {
    return 0;
  }

  onSubmit(): void {
    const loginInfo = { ...this.loginForm.value };
    for (const key in loginInfo) {
      loginInfo[key] = loginInfo[key].trim();
    }
    this.isLoading = true;
    const endpoints = {
      regular: "users/login",
      otherPlayer: "users/info/username-password"
    }

    const endpoint = this.otherPlayer ? endpoints.otherPlayer : endpoints.regular

    this.request.post(endpoint, loginInfo).subscribe({
      next: (response) => {

        if (this.otherPlayer) {
          const otherUser: UserInfo = response
          this.usersService.otherUser = otherUser
        }

        this.handleRedirect()
      },
      error: (err) => {
        this.handleError(err)
      },
    });
  }


  handleRedirect() {
    this.isLoading = false;
    let previousUrl = this.routeHistory.getPrevious();
    const subPresence = /subscribe/;
    const changePassPresence = /change-password/
    const retrievePresence = /retrieve/
    if (subPresence.test(previousUrl)) previousUrl = '';
    if (changePassPresence.test(previousUrl)) previousUrl = '';
    if (retrievePresence.test(previousUrl)) previousUrl = '';
    this.router.navigate(['/' + previousUrl]);
  }

  handleError(err: any) {
    this.isLoading = false;
    this.alert.message = err.error;
    this.alert.switchAlert();
  }

  ngOnInit(): void {
    this.htmlLoginForm = { ...this.loginForm.value };
    this.route.queryParams.subscribe((queryParams) => {
      this.otherPlayer = queryParams.otherPlayer
    })
  }
}
