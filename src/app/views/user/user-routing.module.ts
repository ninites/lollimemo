import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  {
    path: 'subscribe',
    component: SubscribeComponent,
    data: { animation: 'subscribe' },
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
