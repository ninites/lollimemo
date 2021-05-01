import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { GameParamsValidGuard } from './core/guards/setup-guard/game-params-valid.guard';

const routes: Routes = [
  { path: '', redirectTo: 'setup', pathMatch: 'full' },
  {
    path: 'setup',
    loadChildren: async () => {
      const module = await import('./views/setup/setup.module');
      return module.SetupModule;
    },
    data: { animation: 'Setup' },
  },
  {
    path: 'game',
    loadChildren: async () => {
      const module = await import('./views/game/game.module');
      return module.GameModule;
    },
    canActivate: [GameParamsValidGuard],
    data: { animation: 'Game' },
  },
  {
    path: 'themes',
    loadChildren: async () => {
      const module = await import('./views/themes/themes.module');
      return module.ThemesModule;
    },
    canActivate:[AuthGuard],
    data: { animation: 'Themes' },
  },
  {
    path: 'user',
    loadChildren: async () => {
      const module = await import('./views/user/user.module');
      return module.UserModule;
    },
    data: { animation: 'Themes' },
  },
  { path: '**', redirectTo: 'setup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
