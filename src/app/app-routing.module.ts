import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { UsersComponent } from './users/users.component';
import { AgendaComponent } from './agenda/agenda.component';
import { RegisterAgendaComponent } from './register-agenda/register-agenda.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { RegisterStadiumComponent } from './register-stadium/register-stadium.component';
import { AwardsComponent } from './awards/awards.component';
import { RegisterAwardsComponent } from './register-awards/register-awards.component';
import { HistoricalComponent } from './historical/historical.component';
import { UsersAwardsComponent } from './users-awards/users-awards.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},

  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard]},
  {path: 'stadiums', component: StadiumsComponent, canActivate: [AuthGuard]},
  {path: 'awards', component: AwardsComponent, canActivate: [AuthGuard]},
  {path: 'historical', component: HistoricalComponent, canActivate: [AuthGuard]},
  {path: 'users-awards', component: UsersAwardsComponent, canActivate: [AuthGuard]},

  {path: 'register-user', component: RegisterUsersComponent, canActivate: [AuthGuard]},
  {path: 'register-agenda', component: RegisterAgendaComponent, canActivate: [AuthGuard]},
  {path: 'register-stadium', component: RegisterStadiumComponent, canActivate: [AuthGuard]},
  {path: 'register-awards', component: RegisterAwardsComponent, canActivate: [AuthGuard]},

  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
