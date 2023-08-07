import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'Test',
    component: IndexPageComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthguardGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
