import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './core/guards/auth.guard';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';


export const Approutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: FullComponent,
        children: [
            
            { path: 'dashboard', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
        ], 
        canActivate: [AuthGuard]
    },
    {
        path: '',
        component: BlankComponent,
        children: [         
            {
                path: 'authentication',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }
            
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard' 
    }
];


