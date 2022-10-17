import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ListPatientsComponent } from './list-patients/list-patients.component';

import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ListPatientsComponent,
    DialogPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
