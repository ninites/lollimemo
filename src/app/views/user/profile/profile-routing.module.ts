import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';
import { IsAuthResolver } from 'src/app/core/resolvers/isAuth/is-auth.resolver';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'themes', pathMatch: 'full' },
      {
        path: 'themes',
        loadChildren: async () => {
          const module = await import('./themes/themes.module');
          return module.ThemesModule;
        },
        canActivate: [AuthGuard],
        data: { animation: 'Themes' },
        resolve: {
          isAth: IsAuthResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
