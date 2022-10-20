import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/patient.types';
import { ApiPatientDataService } from '../api-patient-data.service';
import { ListPatientsComponent } from '../list-patients/list-patients.component';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css']
})
export class DialogPatientComponent implements OnInit {
  firstName = new FormControl(this.data.firstName);
  lastName = new FormControl(this.data.lastName);
  SEPType = new FormControl(this.data.medicalInfo.SEPType);
  scoreEDSS = new FormControl(this.data.medicalInfo.scoreEDSS);
  gender = new FormControl(this.data.gender);
  firstDegree = new FormControl(this.data.medicalInfo.factors.firstDegree);
  secondDegree = new FormControl(this.data.medicalInfo.factors.secondDegree);
  noDegree = new FormControl(this.data.medicalInfo.factors.noDegree);
  notSure = new FormControl(this.data.medicalInfo.factors.notSure);

  patientForm = this._formBuilder.group({
    firstName: this.firstName,
    lastName: this.lastName,
    gender: this.gender,
    firstDegree: this.firstDegree,
    secondDegree: this.secondDegree,
    noDegree: this.noDegree,
    notSure: this.notSure,
  });

  constructor(public dialogRef: MatDialogRef<ListPatientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient, private apipatients: ApiPatientDataService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  async updatePatient() {  
        let patientToUpdate: any =
        {
          "firstName": this.patientForm.get('firstName')?.value!,
          "lastName": this.patientForm.get('lastName')?.value!,
          "gender": this.patientForm.get('gender')?.value!,
          "medicalInfo": {
            "SEPType": this.patientForm.get('SEPType')?.value!,
            "scoreEDSS": this.patientForm.get('scoreEDSS')?.value!,
            "factors": {
              "firstDegree": this.patientForm.get('firstDegree')?.value!,
              "secondDegree": this.patientForm.get('secondDegree')?.value!,
              "noDegree": this.patientForm.get('noDegree')?.value!,
              "notSure": this.patientForm.get('notSure')?.value!
            }
          },
          "id": this.data.id
        }
          this.apipatients.putPatientById(patientToUpdate.id, patientToUpdate)
              .subscribe((patient: Patient) => 
                this.closeDialog(patient)
          );
  }

  closeDialog(patient: Patient): void {
    this.dialogRef.close(patient);
  }
}
