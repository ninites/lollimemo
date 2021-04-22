import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { PostThemeComponent } from './post-theme/post-theme.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostThemeComponent],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ThemesModule {}
