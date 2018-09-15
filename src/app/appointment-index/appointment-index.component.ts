import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

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

  // pre process finish status
  private preprocessIsFinished: boolean = false;
  // all users created by provider
  private usersList: User[] = [];
  // all appointments
  private appointmentList: Appointment[] = [];
  // appointment count number
  private appointmentTotalNum: number = 0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
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
        if(typeof result == 'string') {
          alert('Slow network... Please refresh again :)');
        } else {
          this.appointmentList = result;
          this.appointmentTotalNum = this.appointmentList.length;
          this.preprocessIsFinished = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // make appointment
  makeAppointment(): void {
    if(this.appointmentTotalNum == 0) {
      this.subjectDataService.sendAppointmentCount(0);
    } else {
      // get id of last appointment
      let num = this.appointmentList[this.appointmentTotalNum - 1].Id;
      // sending current count number of appointments
      this.subjectDataService.sendAppointmentCount(num);
    }
    this.router.navigate(['/app/appointment/add']);
  }

  // edit appointment
  editAppointment(apptId: number): void {
    this.router.navigate(['/app/appointment/edit/' + apptId]);
  }

  // get user name by user id
  processUsersInfoForName(userIdList: number[]): string[] {
    let userList: User[] = JSON.parse(localStorage.getItem('appointmentUsers'));
    let userNamesList: string[] = [];
    for(let id of userIdList) {
      for(let user of userList) {
        if(user.Id == id) {
          userNamesList.push(user.Name);
        }
      }
    }
    return userNamesList;
  }

  // delete appointment
  deleteApointment(apptId: number): void {
    let r = confirm('This Appointment will be deleted!');
    if(r) {
      this.appointmentService.deleteAppointment(apptId.toString()).subscribe(
        res => {
          this.updateAppointmentList(res);
          this.appointmentTotalNum = this.appointmentList.length;
          alert('Áppointment deleted.');
  
        }
      );
    }
  }

  // remove appointment from appointment list
  updateAppointmentList(appt: Appointment): void {
    for(let i = 0; i < this.appointmentList.length; i++) {
      if(this.appointmentList[i].Id == appt.Id) {
        this.appointmentList.splice(i, 1);
      }
    }
  }
}
