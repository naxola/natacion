import { Component, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

	subtitle:string;	

	constructor(private userService: UserService) {
		this.subtitle = "This is some text within a card block."
	}
	ngOnInit(){
		this.userService.getUser()
		.subscribe(
			data => {
				console.log(data);
				localStorage.setItem('currentUserData', JSON.stringify(data));
			},
			error => {
				//this.alertService.error(error);
				console.log(error);
			});
	}
	ngAfterViewInit(){
		
		
		
	}
}