import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ModifyPasswordComponent } from './profile/my-profile/modify-profile/modify-password/modify-password.component';
import { RetrievePasswordComponent } from './retrieve-password/retrieve-password.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  {
    path: 'subscribe',
    component: SubscribeComponent,
    data: { animation: 'subscribe' },
  },
  {
    path: 'retrieve',
    component: RetrievePasswordComponent,
    data: { animation: 'retrieve' },
  },
  {
    path: 'change-password/:token',
    component: ModifyPasswordComponent,
    data: { animation: 'change-password' },
  },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  {
    path: 'profile',
    loadChildren: async () => {
      const module = await import('./profile/profile.module');
      return module.ProfileModule;
    },
    canActivate: [AuthGuard],
    data: { animation: 'Profile' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
