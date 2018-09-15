import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { 
 Appointment
} from '../model/server-response';

@Injectable({
  providedIn: 'root'
})
export class SubjectDataService {

  // appointment count number subject
  private appointmentCountSubject = new BehaviorSubject(-1);
  appointmentCountData = this.appointmentCountSubject.asObservable();

  constructor() { }

  // send appointment count number
  sendAppointmentCount(count: number): void {
    this.appointmentCountSubject.next(count);
  }
}
