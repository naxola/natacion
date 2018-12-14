import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTableModule} from "angular2-datatable";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FrontHomeComponent } from './home/fronthome.component';
import { StudentRegisterComponent } from './student/student-reg.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesTurnosComponent } from './configuration/turnos/components/reg-table/tablesTurnos.component';
import { FormAlumnoComponent } from './reg-alumno/components/form/alumno-form.component';
import { AlertService } from '../core/services/alerts.service';

import { FrontPagesRoutes } from './front.router';
import { StudentService } from '../core/services/student.service';
import { UsersDatatableComponent } from './components/usersdatatable/users-datatable.component';
import { ConfigTurnosComponent } from './configuration/turnos/turnos.component';
import { RegAlumnoComponent } from './reg-alumno/reg-alumno.component';
import { RegistroTurnoComponent } from './configuration/register/reg-turno.component';
import { ConfigService } from '../core/services/config.service';
import { TurnosService } from '../core/services/turnos.service';

import { AddDialogComponent } from './configuration/register/components/dialogs/add/add.dialog.component';

import { MatInputModule, 
  MatPaginatorModule, 
  MatProgressSpinnerModule, 
  MatSortModule, 
  MatTableModule, 
  MatCheckboxModule, 
  MatButtonModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,  
  MatToolbarModule,
  MatDatepickerModule } from "@angular/material";
  import { MatMomentDateModule } from '@angular/material-moment-adapter';
  import {MatDialogModule} from '@angular/material/dialog';
  
@NgModule({
  imports: [ 
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatDialogModule,
    RouterModule.forChild( FrontPagesRoutes )
  ],
  declarations: [
    FrontHomeComponent,
    StudentRegisterComponent,
    ProfileComponent,
    UsersDatatableComponent,
    ConfigTurnosComponent,
    TablesTurnosComponent,
    FormAlumnoComponent,
    RegAlumnoComponent,
    RegistroTurnoComponent,
    AddDialogComponent,
    ],
    
  entryComponents: [
      AddDialogComponent
  ],

  providers:[
    StudentService,
    AlertService,
    ConfigService,
    TurnosService
  ]
})

export class FrontPagesModule {}