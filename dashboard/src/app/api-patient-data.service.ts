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

  //GET PATIENTS
  public getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.REST_API_PATIENT + '/patients');
  }
  //GET PATIENT BY ID
  public getPatientById(id: string): Observable<Patient>{
    return this.http.get<Patient>(this.REST_API_PATIENT + '/patients/'+id);
  }
  //MODIFICATION PATIENT BY ID
  public putPatientById(id: number, patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(this.REST_API_PATIENT + '/patients/'+id, patient);
  }
  //FILTRE PATIENT BY SEARCH
  public getPatientBySearchText(searchText: any): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.REST_API_PATIENT + '/patients/?search='+searchText);
  }
}
