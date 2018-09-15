import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatDialogModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { AppointmentIndexComponent } from './appointment-index/appointment-index.component';
import { LoginComponent } from './login/login.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { SelectUserComponent } from './appointment-edit/select-user/select-user.component';
import { AppointmentHomeComponent } from './appointment-home/appointment-home.component';
import { ErrorlightDirective } from './support/directive/errorlight.directive';

const appRoutes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full'},
  { path: 'app', component: AppointmentHomeComponent },
  { path: 'app/appointment/index', component: AppointmentIndexComponent },
  { path: 'app/appointment/add', component: AppointmentEditComponent },
  { path: 'app/appointment/edit/:id', component: AppointmentEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppointmentIndexComponent,
    LoginComponent,
    AppointmentEditComponent,
    SelectUserComponent,
    AppointmentHomeComponent,
    ErrorlightDirective
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  entryComponents: [
    LoginComponent,
    SelectUserComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
