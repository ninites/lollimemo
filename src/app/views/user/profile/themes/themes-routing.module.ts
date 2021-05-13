import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteThemeComponent } from './delete-theme/delete-theme.component';
import { PostThemeComponent } from './post-theme/post-theme.component';
import { ThemeLandingComponent } from './theme-landing/theme-landing.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeLandingComponent,
    data: { animation: 'ThemesLanding' },
  },
  {
    path: 'post',
    component: PostThemeComponent,
    data: { animation: 'ThemesPost' },
  },
  {
    path: 'delete',
    component: DeleteThemeComponent,
    data: { animation: 'ThemesDelete' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemesRoutingModule {}
