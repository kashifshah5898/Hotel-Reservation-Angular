import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashobardComponent } from './pages/dashobard/dashobard.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingRoomComponent } from './components/booking-room/booking-room.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Sign-Up', component: SignupComponent },
  {
    path: 'Test',
    component: IndexPageComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Dashboard',
    component: DashobardComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Booking',
    component: BookingComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Booking-Room/:id',
    component: BookingRoomComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Users',
    component: UserComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthguardGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
