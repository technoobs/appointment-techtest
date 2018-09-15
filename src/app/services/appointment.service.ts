import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { timeout, catchError} from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import {
  Appointment
} from '../support/model/server-response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseURL: string = environment.baseUrl;
  private providerEmail = localStorage.getItem('providerEmail');

  constructor(
    private http: HttpClient
  ) { }

  // get all appointments created by a provider
  getAllProviderAppointments() {
    return this.http.get<Appointment[]>(this.baseURL + '/api/Appointment?' + 'providerEmail=' + this.providerEmail).pipe(
      timeout(2000),
      catchError(error => of('timeout'))
    );
  }

  // get certain appointment information
  getAppointment(appointmentId: string) {
    return this.http.get<Appointment>(this.baseURL + '/api/Appointment/' + appointmentId + '?providerEmail=' + this.providerEmail);
  }

  // create an appointment
  createAppointment(appointmentData: Appointment) {
    return this.http.post<Appointment>(this.baseURL + '/api/Appointment?providerEmail=' + this.providerEmail, appointmentData);
  }

  // update appoint
  updateAppointment(appointmentData: Appointment) {
    let apptId = appointmentData.Id;
    return this.http.put<Appointment>(this.baseURL + '/api/Appointment/' + apptId + '?providerEmail=' + this.providerEmail, appointmentData);
  }

  // delete an appointment
  deleteAppointment(appointmentId: string) {
    return this.http.delete<Appointment>(this.baseURL + '/api/Appointment/' + appointmentId + '?providerEmail=' + this.providerEmail);
  }
  
}
