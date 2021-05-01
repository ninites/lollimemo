import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreProvidersModule } from './providers/core-providers.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreProvidersModule],
  exports: [CoreProvidersModule],
})
export class CoreModule {}
