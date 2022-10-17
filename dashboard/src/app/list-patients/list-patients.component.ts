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
  patientDetails: any =
    {
      nom: '', 
      prenom: ''
    }
  ;


  constructor(private apipatients: ApiPatientDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listPatients();
  }

  listPatients() {
    this.apipatients.getPatientList()
      .subscribe((patientsTab: Patient[]) => 
        patientsTab.forEach(currentPatient => 
          this.patientConstructor(currentPatient)
        )
      );
  }

  showPatientById(id: any) {
    this.apipatients.getPatientById(id)
      .subscribe((patient: Patient) => 
        this.openDialog(patient)
      );
  }

  patientConstructor(currentPatient: Patient): void{
    this.patients.push({
      "pairing": currentPatient.pairing,
      "createdAt": currentPatient.createdAt,
      "firstName": currentPatient.firstName,
      "lastName": currentPatient.lastName,
      "dominantHand": currentPatient.dominantHand,
      "gender": currentPatient.gender,
      "medicalInfo": {
        "SEPType": currentPatient.medicalInfo.SEPType,
        "scoreEDSS": currentPatient.medicalInfo.scoreEDSS,
        "walkingStickAid": currentPatient.medicalInfo.walkingStickAid,
        "crutchesAid": currentPatient.medicalInfo.crutchesAid,
        "wheelChairAid": currentPatient.medicalInfo.wheelChairAid,
        "walkerAid": currentPatient.medicalInfo.walkerAid,
        "walkWithCaregiverAid": currentPatient.medicalInfo.walkWithCaregiverAid,
        "factors": {
          "firstDegree": currentPatient.medicalInfo.factors.firstDegree,
          "secondDegree": currentPatient.medicalInfo.factors.secondDegree,
          "noDegree": currentPatient.medicalInfo.factors.noDegree,
          "notSure": currentPatient.medicalInfo.factors.notSure
        }
      },
      "id":currentPatient.id
    })
  }

  openDialog(patientClicked: any): void {
    console.log(patientClicked);
    const dialogRef = this.dialog.open(DialogPatientComponent, {
      width: '250px',
      data: patientClicked,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  }
