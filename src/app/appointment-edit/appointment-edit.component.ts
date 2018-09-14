import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import {
  SelectUserComponent
} from './select-user/select-user.component';
import {
  AppointmentService
} from '../services/appointment.service';

import {
  SubjectDataService
} from '../support/subject/subject-data.service';

import {
  User,
  Appointment
} from '../support/model/server-response';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  // appointment form control
  private appointmentFormGroup: FormGroup;
  // mode: edit or add
  private mode: string = '';

  // selected user lists
  private selectedUsers: User[] = [];
  // note lists
  private noteList: string[] = [];
  // temporary note lists
  private tempNoteList: object[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private subjectDataService: SubjectDataService
  ) {}

  ngOnInit() {
    this.createAppointmentForm();
  }

  // define mode types
  private defineMode(): void {

  }

  // create appointment form
  private createAppointmentForm(): void {
    this.appointmentFormGroup = this.fb.group({
      description: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  // add person to appointment
  showSelectUserDialog(): void {
    const dialogRef = this.dialog.open(SelectUserComponent, {
      width: '400px',
      height: '300px',
      data: {
        users: this.selectedUsers
      }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        console.log('Edit received selected user...');
        console.log(res);
        if (res != undefined) {
          // update selected users collection
          this.selectedUsers.push(res);

          console.log('Current selected users are:');
          console.log(this.selectedUsers);
        }
      }
    );

  }

  // add note
  addNote(): void {
    // textarea element
    let txtArea: HTMLElement = document.getElementById('note');
    let txtAreaValue = txtArea['value'];
    if (txtAreaValue.trim().length != 0) {
      let i = this.tempNoteList.length;
      this.tempNoteList.push({
        id: i,
        note: txtAreaValue
      });
      txtAreaValue = '';
    }
  }

  // remove note
  removeNote(id: number): void {
    delete this.tempNoteList[id];
  }

  // edit note
  editNote(id: number): void {

  }

  // save edit for note
  saveNoteEdit(id: number): void {

  }

}
