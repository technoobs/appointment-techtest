import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // get all users
  getAllUsers(providerEmail: string) {
    return this.http.get<User[]>(this.baseURL + '/api/User?' + 'providerEmail=' + providerEmail);
  }

  // get user by id
  getUser(userId: string) {
    return this.http.get<User>(this.baseURL + '/api/User/' + userId + '?providerEmail=' + this.providerEmail);
  }
}
