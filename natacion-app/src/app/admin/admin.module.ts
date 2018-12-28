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
    MatDatepickerModule, 
    MatTabsModule} from "@angular/material";
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
import { DeleteTurnoDialogComponent } from './turnos/components/dialogs/delete/deleteTurno.dialog.component';
import { EditTurnoDialogComponent } from './turnos/components/dialogs/edit/editTurno.dialog.component';
import { AddAlumnoDialogComponent } from './alumnos/components/dialogs/add/addAlumno.dialog.component';
  
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
    MatTabsModule,
    RouterModule.forChild( AdminRoutes )
  ],
  declarations: [
    AdminHomeComponent,
    ConfigTurnosComponent,
    AlumnosComponent,
    AddTurnoDialogComponent,
    DeleteTurnoDialogComponent,
    EditTurnoDialogComponent,
    AddAlumnoDialogComponent
    ],
  entryComponents: [
      AddTurnoDialogComponent,
      DeleteTurnoDialogComponent,
      EditTurnoDialogComponent,
      AddAlumnoDialogComponent
  ],
  providers:[
    AlertService,
    TurnosService,
    ToastrService,
    InscripcionesService
  ]
})

export class AdminModule {}