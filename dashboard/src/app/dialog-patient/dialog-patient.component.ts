import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/patient.types';
import { ListPatientsComponent } from '../list-patients/list-patients.component';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css']
})
export class DialogPatientComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListPatientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient) { }

  ngOnInit(): void {
  }

}
