import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request/request.service';
import { passwordConfirming } from 'src/app/shared/functions/passwordCheck';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss'],
})
export class ModifyPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {}

  modifyPasswordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: passwordConfirming }
  );
  isLoading : boolean = false

  passLabel: string[] = ['Nouveau mot de passe', 'Confirmation mot de passe'];

  trackByFn(index: any, item: any) {
    return index;
  }

  unsorted() {
    return 0;
  }

  onSubmit(): void {
    this.isLoading = true
    this.request
      .post('users/password', {
        password: this.modifyPasswordForm.value.password,
      })
      .subscribe({
        next: (resp) => {
          this.isLoading = false
          this.alert.message = 'Mot de passe correctement modifié';
          this.alert.switchAlert();

        },
        error: (err) => {
          this.alert.message =
            'Probleme lors de la modification du mot de passe';
          this.alert.switchAlert();
        },
      });
  }
}
