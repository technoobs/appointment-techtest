import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { 
  User
} from '../model/server-response';

@Injectable({
  providedIn: 'root'
})
export class SubjectDataService {

  // user list subject
  private usersDataSubject = new BehaviorSubject([]);
  usersData = this.usersDataSubject.asObservable();

  constructor() { }

  sendUsersData(users: User[]): void {
    this.usersDataSubject.next(users);
  }
}
