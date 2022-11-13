import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { RequestService } from 'src/app/core/services/request/request.service';
import { AlertService } from 'src/app/shared/top/alert/alert.service';
import { UserInfo } from 'src/app/views/user/user.interface';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.scss'],
})
export class ModifyProfileComponent implements OnInit {
  constructor(
    private fb: UntypedFormBuilder,
    private request: RequestService,
    private alert: AlertService
  ) { }

  modifyProfileForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    profilePic: [''],
  });

  label = ["Nom d'utilisateur", 'Email'];
  isLoading: { [key: string]: any } = {
    put: false,
    get: true
  }

  profilePictureType = "path"
  profilePicture = ""
  profilePictureSave = false

  ngOnInit(): void {
    this.getUserInfo();
    this.formHandler()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  unsorted() {
    return 0;
  }

  formHandler() {
    this.modifyProfileForm.valueChanges.subscribe((form) => {
      if (form.profilePic) {
        this.profilePictureType = "blob"
        this.profilePicture = form.profilePic[0]
        this.profilePictureSave = true
      }
    })
  }

  saveProfilePic() {
    this.isLoading.put = true
    const formData = new FormData()
    formData.append("profilePic", this.profilePicture)
    this.request.put('users', formData).subscribe({
      next: (resp) => {
        this.isLoading.put = false
        this.profilePictureSave = false
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
      .subscribe((response: any) => {
        const mForm = this.modifyProfileForm.value;
        for (const key in mForm) {
          this.modifyProfileForm.patchValue({ [key]: response[key] });
        }
        this.isLoading.get = false
        this.profilePicture = response.profilePicURL
      });
  }
}
