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
  MatDialogRef,
} from '@angular/material';

import {
  User,
} from '../support/model/server-response';
import {
  UsersService
} from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // login form control
  private loginFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef < LoginComponent > ,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  // create login form
  createLoginForm(): void {
    this.loginFormGroup = this.fb.group({
      providerEmail: ['', Validators.required]
    });
  }

  // login
  login(): void {
    // validate login form
    if (this.loginFormGroup.status == 'INVALID') {
      let ele = document.getElementById('error');
      ele.innerHTML = 'Please enter valid Provider Email';
    } else {
      this.usersService.getAllUsers(this.loginFormGroup.value.providerEmail).subscribe(
        (res) => {
          if (res == 'timeout') {
            alert('Request timeout, please check network connection status....');
          } else {
            // store provider email to local storage
            localStorage.setItem("providerEmail", this.loginFormGroup.value.providerEmail);
            // store users to local storage
            localStorage.setItem("appointmentUsers", JSON.stringify(res));
            let resultObj = {
              info: 'success'
            };
            this.dialogRef.close(resultObj);
          }
        },
        (error) => {
          console.log(error);
          this.handleError(error);
        }
      );
    }
  }

  // close
  close(): void {
    this.dialogRef.close('normal');
  }

  // handle error information
  private handleError(e: object) {
    let ele = document.getElementById('error');
    let errorMsg: string;
    if (e['status'] == 400) {
      if (e['statusText'] == 'Product ID Not Found') {
        errorMsg = 'Provider Email is invalid.';
      }
    }

    ele.innerHTML = errorMsg;
  }

}
