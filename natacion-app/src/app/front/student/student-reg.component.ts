import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { StudentService } from '../../core/services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	templateUrl: './student-reg.component.html'
})
export class StudentRegisterComponent implements AfterViewInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;
	
	subtitle:string;	

	constructor(private formBuilder: FormBuilder,
		private router: Router,
		private studentService: StudentService,
		private toastr: ToastrService) 
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
		console.log(this.registerForm.value);
		
        this.studentService.registerStudent(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.toastr.success('Alumno registrado');
					//this.alertService.success('Registration successful', true);
                    this.router.navigate(['/user/home']);
                },
                error => {
                    this.toastr.error('Algo ha ido mal...', 'Alert!');
                    //this.alertService.error(error);
                    this.loading = false;
				});
				
                
	}
	
}