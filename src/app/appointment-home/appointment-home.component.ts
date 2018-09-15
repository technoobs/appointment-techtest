import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';

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
        if(result != undefined) {
          if(result['info'] == 'success') {
            this.loginStatus = true;
            // get provider email from local storage
            this.providerEmail = localStorage.getItem('providerEmail');
            this.router.navigate(['/app/appointment/index']);
          } else {
            this.loginStatus = false;
          }
        }
      }
    );
  }

}
