import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { timeout, catchError} from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import {
  User
} from '../support/model/server-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL: string = environment.baseUrl;
  providerEmail: string = localStorage.getItem('providerEmail');

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(providerEmail: string) {
    return this.http.get<User[]>(this.baseURL + '/api/User?providerEmail=' + providerEmail).pipe(
      timeout(2000),
      catchError(error => of('timeout'))
    );
  }

  // get user by id
  getUser(userId: string) {
    return this.http.get<User>(this.baseURL + '/api/User/' + userId + '?providerEmail=' + this.providerEmail);
  }
}
