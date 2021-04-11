import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { AsignAwardModalComponent } from './historical/asign-award-modal.component';
import { UsersAwardsComponent  } from './users-awards/users-awards.component';
import { EditUserModalComponent  } from './users/edit-user-modal.component';
import { EditPriceModalComponent  } from './agenda/edit-price-modal.component';
import { StatusModalComponent } from './agenda/status-modal.component';
import { DailyAgendaModalComponent } from './register-agenda/daily-agenda-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    LogoutComponent,
    NotfoundComponent,
    RegisterUsersComponent,
    UsersComponent,
    AgendaComponent,
    RegisterAgendaComponent,
    StadiumsComponent,
    RegisterStadiumComponent,
    AwardsComponent,
    RegisterAwardsComponent,
    HistoricalComponent,
    AsignAwardModalComponent,
    UsersAwardsComponent,
    EditUserModalComponent,
    EditPriceModalComponent,
    StatusModalComponent,
    DailyAgendaModalComponent
  ],
  exports: [
    AsignAwardModalComponent,
    EditUserModalComponent,
    EditPriceModalComponent,
    NgbModule
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [
      AsignAwardModalComponent,
      EditUserModalComponent,
      EditPriceModalComponent,
      StatusModalComponent,
      DailyAgendaModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
