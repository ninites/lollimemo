import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayedMainComponent } from './played-main/played-main.component';

const routes: Routes = [{ path: '', component: PlayedMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayedRoutingModule {}
