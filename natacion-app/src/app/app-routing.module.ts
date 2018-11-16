import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
    {
        path: '',
        component: BlankComponent,
        children: [
            { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
            {
                path: 'authentication',
                loadChildren: './authentication/authentication.module#AuthenticationModule'
            }
        ],
    },
    {
        
        path: '',
        component: FullComponent,
        children: [
            
            { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
        ]
    },
    {
        path: '**',
        redirectTo: '/starter' 
    }
];


