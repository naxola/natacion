import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup2.component.html',
    styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private userService: UserService) { }

    ngOnInit() { 
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    registrarUsuario() {
        alert("Hola");
        /*
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registerUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/authentication/login']);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
                */
    }
}
