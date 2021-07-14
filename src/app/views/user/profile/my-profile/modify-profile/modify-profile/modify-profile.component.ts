import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request/request.service';
import { passwordConfirming } from 'src/app/shared/functions/passwordCheck';
import { AlertService } from 'src/app/shared/top/alert/alert.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss'],
})
export class ModifyProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private alert: AlertService
  ) {}

  modifyProfileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  label = ["Nom d'utilisateur", 'Email'];
  isLoading : {[key:string]:any} = {
    put : false,
    get : true
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  unsorted() {
    return 0;
  }

  onSubmit(): void {
    this.isLoading.put = true
    this.request.put('users', this.modifyProfileForm.value).subscribe({
      next: (resp) => {
        this.isLoading.put = false
        this.alert.message =
          'Modification de votre compte correctement enregistrée';
        this.alert.switchAlert();
      },
      error: (err) => {
        this.alert.message =
          err.error || 'Un probleme à eu lieu lors de la modification';
        this.alert.switchAlert();
      },
    });
  }

  getUserInfo(): void {
    this.request
      .get('users/info')
      .subscribe((response: { [key: string]: any }) => {
        const mForm = this.modifyProfileForm.value;
        for (const key in mForm) {
          this.modifyProfileForm.patchValue({ [key]: response[key] });
        }
        this.isLoading.get = false
      });
  }
}
