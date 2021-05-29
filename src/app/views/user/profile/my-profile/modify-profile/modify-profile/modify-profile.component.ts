import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss'],
})
export class ModifyProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private request: RequestService) {}

  modifyProfileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
  });

  label = ["Nom d'utilisateur", 'Email', 'Mot de passe'];

  ngOnInit(): void {
    this.getUserInfo();
  }

  unsorted() {
    return 0;
  }

  onSubmit(): void {
    this.request.put('users', this.modifyProfileForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
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
      });
  }
}
