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
    this.processUsersForSelect();
  }

  // only display unselected users
  processUsersForSelect() {

    let allUsers = JSON.parse(localStorage.getItem('appointmentUsers'));
    if(this.selectedUsers.length == 0) {
      this.usersCollection = allUsers;
    } else {
      this.usersCollection = [];
      allUsers.forEach(ele => {
        let isFound: boolean = false;
        for(let i = 0; i < this.selectedUsers.length; i++) {
          if(this.selectedUsers[i].Id == ele.Id) {
            isFound = true;
          }
        }
        if(isFound == false) {
          this.usersCollection.push(ele);
        } 
      });
    }
  }

  // add user to appointment
  addUserToAppointment(user: User) {
    this.dialogRef.close(user);
  }

}
