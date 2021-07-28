import { NgModule } from '@angular/core';

import { ThemesRoutingModule } from './themes-routing.module';
import { PostThemeComponent } from './post-theme/post-theme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ThemeLandingComponent } from './theme-landing/theme-landing.component';
import { DeleteThemeComponent } from './delete-theme/delete-theme.component';
import { DeleteThemeItemComponent } from './delete-theme-item/delete-theme-item.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    PostThemeComponent,
    SideMenuComponent,
    ThemeLandingComponent,
    DeleteThemeComponent,
    DeleteThemeItemComponent,
  ],
  imports: [ThemesRoutingModule, SharedModule, SwiperModule],
})
export class ThemesModule {}
