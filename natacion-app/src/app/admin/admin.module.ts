import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {DataTableModule } from "angular2-datatable";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { MatDialogModule } from '@angular/material/dialog';

import { AlertService } from '../core/services/alerts.service';
import { TurnosService } from '../core/services/turnos.service';
import { ToastrService } from 'ngx-toastr';
import { InscripcionesService } from '../core/services/inscripciones.service';



import { AdminRoutes } from './admin.routes';
import { AdminHomeComponent } from './home/home.component';
import { ConfigTurnosComponent } from './turnos/config.turnos.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AddTurnoDialogComponent } from './turnos/components/dialogs/add/addTurno.dialog.component';
  
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
    RouterModule.forChild( AdminRoutes )
  ],
  declarations: [
    AdminHomeComponent,
    ConfigTurnosComponent,
    AlumnosComponent,
    AddTurnoDialogComponent
    ],
  entryComponents: [
      AddTurnoDialogComponent
  ],
  providers:[
    AlertService,
    TurnosService,
    ToastrService,
    InscripcionesService
  ]
})

export class AdminModule {}