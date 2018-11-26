import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CardStudentComponent } from '../widgets/cardStudent/cardStudent.component';
import { StarterComponent } from './starter.component';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Estudiantes',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Estudiantes'}]
    },
	component: StarterComponent
}];

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule, 
    	RouterModule.forChild(routes)
    ],
	declarations: [
		StarterComponent,
		CardStudentComponent
	]
})
export class StarterModule { }