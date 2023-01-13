import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { AuthguardGuard } from './shared/authguard.guard';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  // { path: '', component: IndexPageComponent, canActivate: [AuthguardGuard] },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
