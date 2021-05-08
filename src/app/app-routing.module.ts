import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameParamsValidGuard } from './core/guards/setup-guard/game-params-valid.guard';
import { IsAuthResolver } from './core/resolvers/isAuth/is-auth.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadChildren: async () => {
      const module = await import('./views/setup/setup.module');
      return module.SetupModule;
    },
    data: { animation: 'Setup' },
    resolve: {
      isAth: IsAuthResolver,
    },
  },
  {
    path: 'game',
    loadChildren: async () => {
      const module = await import('./views/game/game.module');
      return module.GameModule;
    },
    canActivate: [GameParamsValidGuard],
    data: { animation: 'Game' },
    resolve: {
      isAth: IsAuthResolver,
    },
  },
  {
    path: 'user',
    loadChildren: async () => {
      const module = await import('./views/user/user.module');
      return module.UserModule;
    },
    data: { animation: 'User' },
    resolve: {
      isAth: IsAuthResolver,
    },
  },
  { path: '**', redirectTo: 'setup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
