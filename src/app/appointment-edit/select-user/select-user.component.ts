import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

import { 
  User,
} from '../../support/model/server-response';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  // users collection displayed in this component
  private usersCollection: User[] = [];
  // selected users
  private selectedUsers: User[] = [];

  constructor(
    private dialogRef: MatDialogRef < SelectUserComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.selectedUsers = data['users'];
  }

  ngOnInit() {
    console.log(this.selectedUsers);
    this.processUsersForSelect();
  }

  // only display unselected users
  processUsersForSelect() {
    let allUsers = JSON.parse(localStorage.getItem('appointmentUsers'));
    // for(let i = 0; i < allUsers.) {

    // }
    console.log('NKNKNKNKNKNK');
    console.log(allUsers);
    if(this.selectedUsers.length == 0) {
      console.log(1);
      this.usersCollection = allUsers;
    } else {
      console.log(2);
      console.log(this.selectedUsers);
      console.log(this.usersCollection);
      allUsers.forEach(ele => {
        if(!this.selectedUsers.includes(ele)) {
          this.usersCollection.push(ele);
          console.log('xx');
          console.log(this.usersCollection);
        }
      });
    }
  }

  // add user to appointment
  addUserToAppointment(user: User) {
    console.log('Adding user...');
    console.log(user);
    this.dialogRef.close(user);
  }

}
