import { Routes } from '@angular/router';
import {OverviewComponent} from './components/overview/overview.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: 'overview', component: OverviewComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: "overview", pathMatch: 'full'},
];
