import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreProvidersModule } from './providers/core-providers.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './providers/token/token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreProvidersModule],
  exports: [CoreProvidersModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
