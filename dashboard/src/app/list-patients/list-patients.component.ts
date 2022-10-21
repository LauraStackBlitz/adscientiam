import { Component, OnInit } from '@angular/core';
import { ApiPatientDataService } from '../api-patient-data.service';
import { Patient } from 'src/patient.types';
import {MatDialog} from '@angular/material/dialog';
import { DialogPatientComponent } from '../dialog-patient/dialog-patient.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})

export class ListPatientsComponent implements OnInit {

  patients: Patient[] = [];
  patientsTab: Patient[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'createdAt', 'gender', 'actions'];
  dataSource : Patient[] = [];
  searchTerm : String ="";

  constructor(private apipatients: ApiPatientDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    //initialise le dataSource pour remplir le tableau de patient
   this.listPatients();
  }

  listPatients() {
    //appel du service api pour recupèrer la liste des patients et filtre par patient pairing à true
    this.apipatients.getPatientList()
      .pipe(
        map((patient: Patient[]) => patient.filter(p => p.pairing == true ))
      )
      .subscribe((patients: Patient[])=>
      this.dataSource = patients
      );
  }

  //appel du service api pour recupèrer le patien par id
  showPatientById(id: any) {
    this.apipatients.getPatientById(id)
      .subscribe((patient: Patient) => 
        this.openDialog(patient)
      );
  }
 
  //appel du service api avec le texte saisie en recherche + filtre par pairing à true
  getSearch() {
    this.apipatients.getPatientBySearchText(this.searchTerm)
      .pipe(
        map((patient: Patient[]) => patient.filter(p => p.pairing == true ))
      )
      .subscribe((patients: Patient[]) => 
        this.dataSource = patients
      );
  }

  //ouvre une popin au click sur une ligne patient du tableau pour afficher les details relatif au patient
  openDialog(patientClicked: any): void {
    console.log(patientClicked);
    const dialogRef = this.dialog.open(DialogPatientComponent, {
      width: '600px',
      data: patientClicked,
    });
    //detecte la fermeture de la popin et refresh la liste des patients pour voir les maj
    dialogRef.afterClosed().subscribe(result => {
      this.listPatients();
    });
  }

  //appel service api avec en parametre le patient à supprimer
  deletePatient(element: Patient){
    let patientToUpdate: any =
    {
      "pairing": false,
      "id": element.id
    }
      this.apipatients.putPatientById(patientToUpdate.id, patientToUpdate)
          .subscribe((patient: Patient) => 
          this.listPatients()
      );
  }
}
