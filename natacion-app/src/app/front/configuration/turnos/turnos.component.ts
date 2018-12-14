import { Component } from '@angular/core';
import { ConfigService } from '../../../core/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
@Component({
	templateUrl: './turnos.component.html'
})

export class ConfigTurnosComponent {
	submitted = false;
	turnosForm: FormGroup;

	localidades = [
		{name: "Callosa de Segura"},
		{name: "Crevillente"}
	  ];
	 selectedValue = null;

	constructor(private configService: ConfigService,private formBuilder: FormBuilder) 
	{
		this.turnosForm = this.formBuilder.group({
            nombre: ['', Validators.required],
			localidad: ['', Validators.required],
			fechaInicio: ['', Validators.required],
			fechaFin: ['', Validators.required],
			fechaLimite: ['', Validators.required]
		});	
	}
	get f() { return this.turnosForm.controls; }
	regisrarTurno(){
		this.submitted = true;
        // stop here if form is invalid
        if (this.turnosForm.invalid) {
            return;
        }
		console.log(this.turnosForm.value);
        this.configService.registrarTurno(this.turnosForm.value)
            .pipe(first())
            .subscribe(
                data => {
                },
                error => {
					console.log(error);
                    
				});
	}
}
