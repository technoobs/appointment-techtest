import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Appointment[]>(this.baseURL + '/api/Appointment?' + 'providerEmail=' + this.providerEmail);
  }

  // get certain appointment information
  getAppointment(appointmentId: string) {
    return this.http.get<Appointment>(this.baseURL + '/api/Appointment?' + appointmentId + 'providerEmail=' + this.providerEmail);
  }

  // create an appointment
  createAppointment() {
    
  }
  
}
