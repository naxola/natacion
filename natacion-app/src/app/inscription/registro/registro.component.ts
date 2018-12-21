import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { SelectionModel } from '@angular/cdk/collections';
import { Turno } from '../../core/models/turno.model';
import { UserTurnosDataSource } from '../../core/services/userturnos.datasource';
import { TurnosService } from '../../core/services/turnos.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InscripcionesService } from '../../core/services/inscripciones.service';
import { RegTurnoUserStudent } from '../../core/models/regturnouserstudent.model';
import { Student } from '../../core/models/student.model';
import { first } from 'rxjs-compat/operator/first';
import { Router } from '@angular/router';

export interface calzadosNum {
	numero: number;
}

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})



export class RegistroComponent implements OnInit {

  validation_messages = {
		'userFirstName': [
		  { type: 'required', message: 'Se requiere poner el nombre del padre o tutor' }
		],
		'userLastName': [
		  { type: 'required', message: 'Se requiere poner los apellidos del padre o tutor' }
		],
		'userMail': [
		  { type: 'required', message: 'Se requiere poner los apellidos del padre o tutor' }
		],		
		'userPhone': [
			{ type: 'required', message: 'Se requiere poner los apellidos del padre o tutor' },
			{ type: 'pattern', message: 'El teléfono debe tener el formato 000000000 de 9 números' }
		],
		'studentFirstName': [
		  { type: 'required', message: 'Se requiere poner el nombre del alumno' }
		],
		'studentLastName': [
		  { type: 'required', message: 'Se requiere poner los apellidos del alumno' }
		],
		'fechaNacimiento': [
			{ type: 'required', message: 'Por favor introduce la fecha de nacimiento' }
			//{ type: 'pattern', message: 'La fecha debe ser con el formato dd/mm/aaaa' }
		],
		'numPie': [
			{ type: 'required', message: 'Por favor introduce un valor' }
			//{ type: 'pattern', message: 'La fecha debe ser con el formato dd/mm/aaaa' }
		]
	};

	minDate = new Date(1900, 0, 1);
	maxDate = new Date(2020, 0, 1);
	calzados: calzadosNum[] = [];
	registroAlumno: FormGroup;
	
	//Elementos de la tabla de turnos disponibles
	turnosDataBase: TurnosService | null;
	dataSource: UserTurnosDataSource | null;
	displayedColumns: string[] = ['select', 'turno', 'lugar', 'horario', 'fecha_desde', 'fecha_hasta', 'fecha_limite'];
	selection = new SelectionModel<Turno>(true, []);
	turnosData: Turno[] = [];
	reg_alumno: RegTurnoUserStudent;

	returnUrl: string;

	
	constructor(private router: Router, private formBuilder: FormBuilder,	private httpClient: HttpClient,	private toastrService: ToastrService, 
		private inscripcionesService: InscripcionesService) { 
		this.turnosDataBase = new TurnosService(this.httpClient, this.toastrService);
		this.returnUrl = '/inscripcion';
	}

	ngOnInit() { 
			this.crearFormulario();
			this.dataSource = new UserTurnosDataSource(this.turnosDataBase);
			this.dataSource.loadTurnosDisponibles(); 
	}

	private rellenarSelect (){
		var i:number; 
		for(i=25;i <= 50; i++) {
			this.calzados.push({'numero': i});
		}
	}
	
	private crearFormulario(){
		this.rellenarSelect();
		this.registroAlumno = this.formBuilder.group({
			userFirstName: ['', Validators.required ],
			userLastName: ['', Validators.required ],
			userMail: ['', Validators.required ],
			userPhone: new FormControl('',Validators.compose(
					[
						Validators.pattern('^[0-9]{9}$'),
						Validators.required
					]
			)),
			studentFirstName: ['', Validators.required ],
			studentLastName: ['', Validators.required ],
			fechaNacimiento: new FormControl('', Validators.compose([
				//Validators.pattern('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$'),
				Validators.required
			])),
			numPie: ['', Validators.required ]
		});
	}
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.turnosData.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
		this.selection.clear() :
		this.turnosData.forEach(row => this.selection.select(row));
	}
	hasSelection(){
		const numSelected = this.selection.selected.length;
		if (numSelected === 0){
			return false;
		}
		return true;
	}
	submitForm(data){
		//var reg_alumno: RegTurnoUserStudent;
		this.reg_alumno = new RegTurnoUserStudent;
		this.reg_alumno.student = new Student;
		
		this.reg_alumno.userFirstName = data['userFirstName'];
		this.reg_alumno.userLastName = data['userLastName'];
		this.reg_alumno.userMail = data['userMail'];
		this.reg_alumno.userPhone = data['userPhone'];

		this.reg_alumno.student.fechaNacimiento = data['fechaNacimiento']['_d'];
		this.reg_alumno.student.firstName = data['studentFirstName'];
		this.reg_alumno.student.lastName = data['studentLastName'];
		this.reg_alumno.student.numPie = data['numPie']['numero'];

		this.reg_alumno.turnos = this.selection.selected;
		this.inscripcionesService.registerInscription(this.reg_alumno)
		.subscribe(
			data => {
				this.resolvePage(data['bt1'],data['bt2']);
			},
			error => {
				console.log(error);
			});
	}
	resolvePage(bt1:boolean, bt2:boolean){
		if(bt1 == true && bt2 == false){
			this.removeFormData();
		}
		if(bt1 == false && bt2 == true){
			this.router.navigate([this.returnUrl]);
		}
	}
	removeFormData(){
		this.registroAlumno.controls['studentFirstName'].setValue("");
		this.registroAlumno.controls['studentLastName'].setValue("");
		this.registroAlumno.controls['fechaNacimiento'].setValue("");
		this.registroAlumno.controls['numPie'].setValue("");

		this.registroAlumno.controls['studentFirstName'].setErrors(null);
		this.registroAlumno.controls['studentLastName'].setErrors(null);
		this.registroAlumno.controls['fechaNacimiento'].setErrors(null);
		this.registroAlumno.controls['numPie'].setErrors(null);
		this.selection.clear();
	}
		
}
