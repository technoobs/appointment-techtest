import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { UsersService } from '../services/users.service';
import { AppointmentService } from '../services/appointment.service';
import { SubjectDataService } from '../support/subject/subject-data.service';

import { 
  User,
  Appointment
} from '../support/model/server-response';

@Component({
  selector: 'app-appointment-index',
  templateUrl: './appointment-index.component.html',
  styleUrls: ['./appointment-index.component.css']
})
export class AppointmentIndexComponent implements OnInit {

  // login status
  private loginStatus: boolean = false;
  // pre process finish status
  private preprocessIsFinished: boolean = false;
  // provider email
  private providerEmail: string;

  // all users created by provider
  private usersList: User[] = [];
  // all appointments
  private appointmentList: Appointment[] = [];
  // appointments displayed data
  private displayedAppointments: Appointment[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private usersService: UsersService,
    private appointmentService: AppointmentService,
    private subjectDataService: SubjectDataService,
  ) { }

  ngOnInit() {

    // process users data
    this.usersList = JSON.parse(localStorage.getItem('appointmentUsers'));

    // get all appointments
    this.getAllAppointments();
  }

  // get all appointments
  getAllAppointments(): void {
    this.appointmentService.getAllProviderAppointments().subscribe(
      result => {
        console.log(result);
        this.appointmentList = result;
        this.displayedAppointments = this.appointmentList;
        this.preprocessIsFinished = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  // search all appointments of one user
  getUserAppointments(): void {
    let ele = document.getElementById('user-select');
    this.displayedAppointments = [];
    this.appointmentList.forEach(
      (appointment) => {
        if(appointment.Party.indexOf(Number(ele['value'])) != -1) {
          this.displayedAppointments.push(appointment);
        }
      }
    );
  }

  // make appointment
  makeAppointment(): void {
    this.router.navigate(['/app/appointment/add']);
  }
}
