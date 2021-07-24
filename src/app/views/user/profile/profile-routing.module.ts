import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { IsAuthResolver } from 'src/app/core/resolvers/isAuth/is-auth.resolver';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { animation: 'Profile' },
    children: [
      { path: '', redirectTo: 'my-profile', pathMatch: 'full' },
      {
        path: 'themes',
        loadChildren: async () => {
          const module = await import('./themes/themes.module');
          return module.ThemesModule;
        },
        data: { animation: 'Themes' },
      },
      {
        path: 'my-profile',
        loadChildren: async () => {
          const module = await import('./my-profile/my-profile.module');
          return module.MyProfileModule;
        },
        data: { animation: 'Themes' },
      },
      {
        path: 'played',
        loadChildren: async () => {
          const module = await import('./played/played.module');
          return module.PlayedModule;
        },
        data: { animation: 'Themes' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
