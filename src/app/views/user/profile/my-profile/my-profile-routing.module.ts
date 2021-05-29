import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyProfileComponent } from './modify-profile/modify-profile/modify-profile.component';

const routes: Routes = [{ path: '', component: ModifyProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
