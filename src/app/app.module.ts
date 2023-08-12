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
import { AvatarModule } from 'ngx-avatar';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SignupComponent } from './components/signup/signup.component';
import { MatSelectModule } from '@angular/material/select';
import { AdminDashobardComponent } from './components/admin-dashobard/admin-dashobard.component';
import { UserDashobardComponent } from './components/user-dashobard/user-dashobard.component';
import { DashobardComponent } from './pages/dashobard/dashobard.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingRoomComponent } from './components/booking-room/booking-room.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserComponent } from './components/user/user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexPageComponent,
    ErrorPageComponent,
    LoginComponent,
    NavbarComponent,
    SidenavComponent,
    FooterComponent,
    SignupComponent,
    AdminDashobardComponent,
    UserDashobardComponent,
    DashobardComponent,
    BookingComponent,
    BookingRoomComponent,
    UserComponent,
    ProfileComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    IvyCarouselModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    NgxUiLoaderModule,
    AvatarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
