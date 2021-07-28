import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyPasswordComponent } from './modify-profile/modify-password/modify-password.component';
import { ModifyProfileLandingComponent } from './modify-profile/modify-profile-landing/modify-profile-landing.component';
import { ModifyProfileComponent } from './modify-profile/modify-profile/modify-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ModifyProfileLandingComponent,
    children: [
      { path: '', component: ModifyProfileComponent },
      { path: 'password', component: ModifyPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
