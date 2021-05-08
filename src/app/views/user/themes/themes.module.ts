import { NgModule } from '@angular/core';

import { ThemesRoutingModule } from './themes-routing.module';
import { PostThemeComponent } from './post-theme/post-theme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [PostThemeComponent, SideMenuComponent],
  imports: [ThemesRoutingModule, SharedModule],
})
export class ThemesModule {}
