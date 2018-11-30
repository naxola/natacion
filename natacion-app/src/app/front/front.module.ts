import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FrontHomeComponent } from './home/fronthome.component';
import { StudentRegisterComponent } from './student/student-reg.component';


import { FrontPagesRoutes } from './front.router';
import { StudentService } from '../core/services/student.service';
import { AlertService } from '../core/services/alerts.service';

@NgModule({
  imports: [ 
    CommonModule,
    RouterModule.forChild( FrontPagesRoutes ),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FrontHomeComponent,
    StudentRegisterComponent
  ],
  providers:[
    StudentService,
    AlertService
  ]
})

export class FrontPagesModule {}