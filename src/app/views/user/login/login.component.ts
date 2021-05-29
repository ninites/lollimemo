import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';
import { RouteHistoryService } from 'src/app/core/services/route-history/route-history.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private router: Router,
    private routeHistory: RouteHistoryService,
    private alert: AlertService
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.minLength(2), Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  htmlLoginForm = {};
  label: string[] = ["Nom d'utilisateur", 'Mot de passe'];

  notSorted() {
    return 0;
  }

  onSubmit(): void {
    this.request.post('users/login', this.loginForm.value).subscribe({
      next: () => {
        let previousUrl = this.routeHistory.getPrevious();
        const subPresence = /subscribe/;
        if (subPresence.test(previousUrl)) previousUrl = '';
        this.router.navigate(['/' + previousUrl]);
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }

  ngOnInit(): void {
    this.htmlLoginForm = { ...this.loginForm.value };
  }
}
