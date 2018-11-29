import { Component, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
	templateUrl: './fronthome.component.html'
})
export class FrontHomeComponent implements AfterViewInit {

	subtitle:string;	

	constructor(private toastr: ToastrService) {
		this.subtitle = "Home"
	}
	ngAfterViewInit(){
		
		
		
	}

}