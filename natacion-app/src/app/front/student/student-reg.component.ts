import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { StudentService } from '../../core/services/student.service';
import { AlertService, AlertMessage, AlertTypes } from '../../core/services/alerts.service';

@Component({
	templateUrl: './student-reg.component.html'
})
export class StudentRegisterComponent implements AfterViewInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;
	alertMessage: AlertMessage
	
	subtitle:string;	

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private studentService: StudentService,
		private alertService: AlertService)
		{
		this.subtitle = "Register User"
		this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			fechaNacimiento: ['', Validators.required],
			numPie: ['', Validators.required]
		});		
	}
	ngAfterViewInit(){
		
	}

	get f() { return this.registerForm.controls; }

	registrarStudent() {
        
        
        this.submitted = true;
        

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        
        
		this.loading = true;
		
        this.studentService.registerStudent(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
					this.successRegistration();
                },
                error => {
					console.log(error);
                    //this.problemOnRegistration();
				});
	}
	private successRegistration(){
		this.alertMessage = {text: "Has registrado a un alumno", type: AlertTypes.ALERT_SUCCESS};
		this.alertService.setMessage(this.alertMessage);
		this.router.navigate(['/user/home']);
	}
	private problemOnRegistration(){
		this.alertMessage.text= "Ha ocurrido algun error interno. Vuelve a intentarlo";
		this.alertMessage.type = AlertTypes.ALERT_ERROR;
		this.alertService.setMessage(this.alertMessage);
		this.loading = false;
	}
	
}