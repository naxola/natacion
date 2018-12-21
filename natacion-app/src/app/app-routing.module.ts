import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './core/guards/auth.guard';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';


export const Approutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [         
            { path: '', redirectTo: '/inscripcion', pathMatch: 'full' },
            { path: 'inscripcion', loadChildren: './inscription/inscripcion.module#InscripcionModule' },
            { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule' }
            
        ]
    },
    {
        path: 'admin',
        component: FullComponent,
        children: [
            { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
            { path: '', loadChildren: './admin/admin.module#AdminModule' },
        ], 
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/' 
    }
];


