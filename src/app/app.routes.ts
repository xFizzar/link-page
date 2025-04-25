import { Routes } from '@angular/router';
import {OverviewComponent} from './components/overview/overview.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './guards/auth.guard';
import {CreateAppComponent} from './components/create-app/create-app.component';

export const routes: Routes = [
  {path: 'overview', component: OverviewComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'createApp', component: CreateAppComponent},
  {path: '**', redirectTo: "overview", pathMatch: 'full'},
];
