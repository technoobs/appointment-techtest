import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SubjectDataService } from '../support/subject/subject-data.service';

import { 
  User
} from '../support/model/server-response';

import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-home',
  templateUrl: './appointment-home.component.html',
  styleUrls: ['./appointment-home.component.css']
})
export class AppointmentHomeComponent implements OnInit {

  // login status
  private loginStatus: boolean = false;
  // provider email
  private providerEmail: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private subjectDataService: SubjectDataService,
  ) { }

  ngOnInit() {
  }

  // display login dialog
  displayLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        console.log('Login dialog is closed');
        console.log(result);
        if(result['info'] == 'success') {
          this.loginStatus = true;
          // get provider email from local storage
          this.providerEmail = localStorage.getItem('providerEmail');
          // this.subjectDataService.sendUsersData(result['users']);
          this.router.navigate(['/app/appointment']);
        } else {
          this.loginStatus = false;
        }
      }
    );
  }

}
