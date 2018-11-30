import { Component, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { AlertService, AlertMessage, AlertTypes } from '../../core/services/alerts.service';
import { Alert } from 'selenium-webdriver';

@Component({
	templateUrl: './fronthome.component.html'
})
export class FrontHomeComponent implements AfterViewInit {
	students: Student[] = [];
	subtitle:string;	
	message: AlertMessage;

    subscription: Subscription;
	constructor(private studentService: StudentService,
				private alertService: AlertService,
				private toastrService: ToastrService) 
	{
		this.subtitle = "Home"
	}
	ngOnInit(){
		if(this.alertService.isDirty()){
			this.message = this.alertService.getMessage();

			switch(this.message.type){
				case AlertTypes.ALERT_SUCCESS: {
					setTimeout(()=>this.toastrService.success(this.message['text'],"Enhorabuena!!"));
					break;
				}
				case AlertTypes.ALERT_ERROR: {
					setTimeout(()=>this.toastrService.error(this.message['text'], "Vaya... esto es raro"));
					break;
				}
			}
			
		}
	}
	ngAfterViewInit(){		
		this.loadAllStudents();
		
	}
	private loadAllStudents(){
		this.studentService.getAllFromUser().
			pipe(first())
			.subscribe(
			data => { 
				this.students = data['data']; 
			
			},
			error =>{
				setTimeout(()=>this.toastrService.error("Algo ha ido mal al cargar los usuarios","Ooops..."));
			}
		);
	  }
}