import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/core/services/request/request.service';
import { passwordConfirming } from 'src/app/shared/functions/passwordCheck';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private router: Router,
    private alert: AlertService
  ) {}

  subForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: passwordConfirming }
  );

  label = [
    "Nom d'utilisateur",
    'Email',
    'Mot de passe',
    'Confirmation mot de passe',
  ];

  formList = {};

  unsorted() {
    return 0;
  }

  onSubmit(): void {
    this.request.post('users', this.subForm.value).subscribe({
      next: () => {
        this.router.navigate(['/user/login']);
      },
      error: (err) => {
        this.alert.message = err.error;
        this.alert.switchAlert();
      },
    });
  }

  ngOnInit(): void {
    this.formList = { ...this.subForm.value };
  }
}
