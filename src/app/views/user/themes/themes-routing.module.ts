import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostThemeComponent } from './post-theme/post-theme.component';

const routes: Routes = [
  { path: '', redirectTo: 'post', pathMatch: 'full' },
  { path: 'post', component: PostThemeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemesRoutingModule {}
