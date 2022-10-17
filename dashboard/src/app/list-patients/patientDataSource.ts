import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { ApiPatientDataService } from '../api-patient-data.service';
import { Patient } from 'src/patient.types';

export class PatientDataSource extends DataSource<any> {
    constructor(private patientService: ApiPatientDataService) {
      super();
    }
    connect(): Observable<Patient[]> {
      return this.patientService.getPatientList();
    }
    disconnect() { }
  }