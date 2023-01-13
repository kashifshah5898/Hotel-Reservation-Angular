import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-alerts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { InterceptorInterceptor } from './shared/interceptor.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    NgxUiLoaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
