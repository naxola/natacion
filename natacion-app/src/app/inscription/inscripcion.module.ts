import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTableModule} from "angular2-datatable";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AlertService } from '../core/services/alerts.service';
import { TurnosService } from '../core/services/turnos.service';


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
import { RegistroComponent } from './registro/registro.component';
import { InscripcionRoutes } from './inscripcion.routes';
import { InicioComponent } from './inicio/inicio.component';
import { ToastrService } from 'ngx-toastr';
import { InscripcionesService } from '../core/services/inscripciones.service';
  
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
    RouterModule.forChild( InscripcionRoutes )
  ],
  declarations: [
    RegistroComponent,
    InicioComponent
    ],
  providers:[
    AlertService,
    TurnosService,
    ToastrService,
    InscripcionesService
  ]
})

export class InscripcionModule {}