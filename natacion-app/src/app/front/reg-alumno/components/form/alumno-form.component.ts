import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ConfigService } from '../../../../core/services/config.service';
import { ConfigurationDataSource } from '../../../../core/services/configuration.datasource';
import { Turno } from '../../../../core/models/turno.model';
import { Student, Fecha } from '../../../../core/models/student.model';
import { StudentService } from '../../../../core/services/student.service';
import { first } from 'rxjs/operators';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import { AlertService, AlertMessage, AlertTypes } from '../../../../core/services/alerts.service';
import { Router } from '@angular/router';

  export interface calzadosNum {
	numero: number;
  }


@Component({
	selector: 'app-form-alumno',
	templateUrl: './alumno-form.component.html',
	styleUrls: ['./alumno-form.component.css']
})
export class FormAlumnoComponent implements OnInit{
	
	reg_SusForm: FormGroup;
	alumno: Student;

	validation_messages = {
		'firstName': [
		  { type: 'required', message: 'Se requiere poner el nombre del alumno' }
		],
		'lastName': [
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

	dataSource: ConfigurationDataSource;
	displayedColumns: string[] = ['select', 'turno', 'lugar', 'horario', 'fecha_desde', 'fecha_hasta'];

	selection = new SelectionModel<Turno>(true, []);

	turnosData: Turno[] = [];
	calzados: calzadosNum[] = [];

	alertMessage: AlertMessage

	constructor(private formBuilder: FormBuilder,
		private adapter: DateAdapter<any>,
		private configService: ConfigService,
		private studentService: StudentService,
		private insrciptionsService: InscriptionsService,
		private alertService: AlertService,
		private router: Router){

		this.alumno = new Student;
		this.adapter.setLocale('es');
		
	}

	rellenarSelect (){
		var i:number; 
		for(i=25;i <= 50; i++) {
			this.calzados.push({'numero': i});
		}
		
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
	hasDataTable(){
		const numRows = this.turnosData.length;
		if(numRows == 0){
			return false;
		}
		return true;
	}
	
	ngOnInit(): void {
		this.crearFormulario();
		this.dataSource = new ConfigurationDataSource(this.configService);
		this.dataSource.loadTurnosDisponibles();
		this.cargar();
	}
	cargar(){
		this.dataSource.turnosSubject
		.skip(1)
		.subscribe((data) => {
			this.selection.clear();
			this.turnosData = data;
		});
	}
	crearFormulario(){
		console.log("Llamada");
		this.rellenarSelect();
		this.reg_SusForm = this.formBuilder.group({
			firstName: ['', Validators.required ],
			lastName: ['', Validators.required ],
			fechaNacimiento: new FormControl('', Validators.compose([
				//Validators.pattern('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$'),
				Validators.required
			])),
			numPie: ['', Validators.required ]
		});
	}
	hasSelection(){
		const numSelected = this.selection.selected.length;
		if (numSelected === 0){
			return false;
		}
		return true;
	}
	submitForm(data){
		let birthday = {
			day: data.fechaNacimiento['_d'].getDate(),
			month: data.fechaNacimiento['_d'].getMonth(),
			year: data.fechaNacimiento['_d'].getFullYear()
		}

		this.alumno.fechaNacimiento = birthday;
		this.alumno.firstName = data.firstName;
		this.alumno.lastName = data.lastName;
		this.alumno.numPie = data.numPie['numero'];
		this.guardarDatosAlumno();

	}
	guardarDatosAlumno(){
		console.log(this.alumno);
        this.studentService.registerStudent(this.alumno)
            .pipe(first())
            .subscribe(
                data => {
					const idAl = data['data']['id'];
					this.guardarDatosTurno(idAl);
                },
                error => {
					console.log(error);
                    //this.problemOnRegistration();
				});
	}
	guardarDatosTurno(id_alumno: number){
		console.log("Dentro de inscripcion");
		this.insrciptionsService.registerInscription(this.selection.selected, id_alumno)
            .pipe(first())
            .subscribe(
                data => {
					this.successRegistration();
                },
                error => {
					console.log(error);
                    this.problemOnRegistration();
				});
	}
	private successRegistration(){
		this.alertMessage = {text: "Has inscrito a un alumno", type: AlertTypes.ALERT_SUCCESS};
		this.alertService.setMessage(this.alertMessage);
		this.router.navigate(['/user/home']);
	}
	private problemOnRegistration(){
		this.alertMessage.text= "Ha ocurrido algun error interno. Vuelve a intentarlo";
		this.alertMessage.type = AlertTypes.ALERT_ERROR;
		this.alertService.setMessage(this.alertMessage);
	}
}