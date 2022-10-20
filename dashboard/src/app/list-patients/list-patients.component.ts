import { Component, OnInit } from '@angular/core';
import { ApiPatientDataService } from '../api-patient-data.service';
import { Patient } from 'src/patient.types';
import { PatientDataSource } from './patientDataSource';
import {MatDialog} from '@angular/material/dialog';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})

export class ListPatientsComponent implements OnInit {

  patients: Patient[] = [];
  patientsTab: Patient[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'createdAt', 'gender', 'actions'];
  dataSource= new PatientDataSource(this.apipatients);

  constructor(private apipatients: ApiPatientDataService, public dialog: MatDialog, public dataSourceService: PatientDataSource) { }

  ngOnInit(): void {}

  showPatientById(id: any) {
    this.apipatients.getPatientById(id)
      .subscribe((patient: Patient) => 
        this.openDialog(patient)
      );
  }

  openDialog(patientClicked: any): void {
    console.log(patientClicked);
    const dialogRef = this.dialog.open(DialogPatientComponent, {
      width: '600px',
      data: patientClicked,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource= new PatientDataSource(this.apipatients);
    });
  }

  deletePatient(element: Patient){
    let patientToUpdate: any =
    {
      "pairing": false,
      "id": element.id
    }
      this.apipatients.putPatientById(patientToUpdate.id, patientToUpdate)
          .subscribe((patient: Patient) => 
          this.dataSource= new PatientDataSource(this.apipatients)
      );
  }
}
