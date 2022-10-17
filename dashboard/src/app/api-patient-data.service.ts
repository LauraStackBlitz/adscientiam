import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/patient.types';

@Injectable({
  providedIn: 'root'
})
export class ApiPatientDataService {
  REST_API_PATIENT = "https://6321df41fd698dfa29015d2d.mockapi.io";
  constructor(private http: HttpClient) { 
  }

  public getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.REST_API_PATIENT + '/patients');
  }

  public getPatientById(id: string): Observable<Patient>{
    return this.http.get<Patient>(this.REST_API_PATIENT + '/patients/'+id);
  }
}
