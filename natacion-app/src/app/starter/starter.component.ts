import { Component, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

	subtitle:string;	
	currentUser: User;

	constructor(private userService: UserService) {
		
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		console.log(this.currentUser);
		this.subtitle = "This is some text within a card block."
	}

	ngAfterViewInit(){}
}