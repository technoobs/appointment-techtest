import {
  Component,
  OnInit,
  OnDestroy
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
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Subscription
} from 'rxjs';

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
export class AppointmentEditComponent implements OnInit, OnDestroy {

  // appointment form control
  private appointmentFormGroup: FormGroup;
  // mode: edit or add
  private mode: string = '';

  // selected user lists for display
  private selectedUsers: User[] = [];
  // selected user lists for creating appointment
  private partyList: number[] = [];
  // note lists
  private noteList: string[] = [];
  // temporary note lists
  private tempNoteList: object[] = [];
  // assigned id to new appointment
  private appointmentId: number = 0;

  // time to start appointment
  public startAt;
  // time to end appointment
  public endAt;

  // appointment data
  appointmentData: Appointment;

  appointmentCountSubscription: Subscription;
  appointmentDataSubscription: Subscription;
  // appointmentCountSubscription: Subscription;

  // show party error
  showPartyError: boolean = false;
  // show time error
  showTimeError: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private subjectDataService: SubjectDataService
  ) {}

  ngOnInit() {
    this.defineMode();
    this.createAppointmentForm();

    if (this.mode == 'add') {
      this.appointmentCountSubscription = this.subjectDataService.appointmentCountData.subscribe(
        res => {
          if (res != -1) {
            this.appointmentId = res + 1;
          }
        }
      );
    } else if (this.mode == 'edit') {
      let apptId = this.route.snapshot.params['id'];
      this.appointmentService.getAppointment(apptId).subscribe(
        res => {
          this.setValueForEdit(res);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.mode == 'add') {
      this.appointmentCountSubscription.unsubscribe();
    }
  }

  // define mode types
  defineMode(): void {
    if (this.router.url.indexOf('edit') != -1) {
      this.mode = 'edit';
    } else if (this.router.url.indexOf('add') != -1) {
      this.mode = 'add';
    }
  }

  // send appointment data to backend server
  saveForm() {
    this.partyList = [];
    this.noteList = [];

    // check party
    if(this.selectedUsers.length == 0) {
      this.showPartyError = true;
    } else {
      this.selectedUsers.forEach((user) => {
        this.partyList.push(user.Id);
      });
    }

    this.tempNoteList.forEach((note) => {
      this.noteList.push(note['note']);
    });

    // check form and date
    if(this.appointmentFormGroup.status == 'VALID') {
      let startTime = new Date(this.appointmentFormGroup.value.start).getTime();
      let endTime = new Date(this.appointmentFormGroup.value.end).getTime();
      if(startTime > endTime) {
        this.showTimeError = true;
      } else {
        if (this.mode == 'add') {
          // create appointment
          this.appointmentService.createAppointment(
            this.prepareAppointmentData(this.partyList, this.noteList, this.appointmentFormGroup.value)
          ).subscribe(
            res => {
              console.log(res);
              alert('Appointment created successfully!');
              this.router.navigate(['/app/appointment/index']);
            },
            error => {
              console.log(error);
            }
          );
        } else if (this.mode == 'edit') {
          // update appointment
          this.appointmentService.updateAppointment(
            this.prepareAppointmentData(this.partyList, this.noteList, this.appointmentFormGroup.value)
          ).subscribe(
            res => {
              console.log(res);
              alert('Appointment updated successfully!');
              this.router.navigate(['/app/appointment/index']);
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    } else {
      alert('Please fill the form if you want to make an appointment.');
    }
  }

  // format appointment data
  prepareAppointmentData(
    partyList: number[],
    noteList: string[],
    appointmentFormValue: object
  ): Appointment {
    this.appointmentData = {
      Description: '',
      Start: new Date(),
      End: new Date(),
      Notes: [],
      Party: [],
      Id: -1,
      ProviderEmail: ''
    };

    this.appointmentData.Id = this.appointmentId;
    this.appointmentData.Description = appointmentFormValue['description'];
    this.appointmentData.Start = appointmentFormValue['start'];
    this.appointmentData.End = appointmentFormValue['end'];
    this.appointmentData.Notes = noteList;
    this.appointmentData.Party = partyList;
    this.appointmentData.ProviderEmail = localStorage.getItem('providerEmail');

    return this.appointmentData;
  }

  // create appointment form
  createAppointmentForm(): void {
    this.appointmentFormGroup = this.fb.group({
      description: [''],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  // set value for form
  setValueForEdit(appt: Appointment): void {
    // set value for Description, Start Date, End Date
    this.appointmentFormGroup.setValue({
      description: appt.Description,
      start: new Date(appt.Start),
      end: new Date(appt.End)
    });
    // set value for appointment Id
    this.appointmentId = appt.Id;
    // set value for users
    let apptUser = JSON.parse(localStorage.getItem('appointmentUsers'));
    for(let i = 0; i < appt.Party.length; i++) {
      apptUser.forEach((user) => {
        if(user['Id'] == appt.Party[i]) {
          this.selectedUsers.push(user);
        }
      });
    }
    // set value for notes
    for(let i = 0; i < appt.Notes.length; i++) {
      this.tempNoteList.push({
        id: i + 1,
        note: appt.Notes[i]
      });
    }
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
        if (res != undefined) {
          // update selected users collection
          this.selectedUsers.push(res);
        }
      }
    );

  }

  // set appointment start date
  setStartDate() {
    this.startAt = new Date();
  }

  // set appointment end date
  setEndDate() {
    this.endAt = new Date();
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
    }
  }

  // remote user
  removeUser(id: number): void {
    for(let i = 0; i < this.selectedUsers.length; i++) {
      if(this.selectedUsers[i].Id == id) {
        // delete this.selectedUsers[i];
        this.selectedUsers.splice(i, 1);
      }
    }
  }

  // remove note
  removeNote(id: number): void {
    // delete this.tempNoteList[id];
    this.tempNoteList.splice(id, 1);
  }
}
