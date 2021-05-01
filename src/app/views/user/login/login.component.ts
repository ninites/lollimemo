import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.minLength(2), Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  htmlLoginForm = {};
  errorMessage: string = '';

  onSubmit(): void {
    this.request.post('users/login', this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.err;
      },
    });
  }

  ngOnInit(): void {
    this.htmlLoginForm = { ...this.loginForm.value };
  }
}
