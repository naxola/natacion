import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AddAlumnoDialogComponent } from './components/dialogs/add/addAlumno.dialog.component';
import { InscripcionesService } from '../../core/services/inscripciones.service';
import { InscripcionesDataSource } from '../../core/services/inscripciones.datasource';

@Component({
	templateUrl: './alumnos.component.html'
})
export class AlumnosComponent implements OnInit {
	displayedColumns = ['id', 'nombre_usuario', 'phone_usuario', 'nombre_student', 'localidad', 'nombre', 'horario', 'actions'];

	inscripcionesDataBase: InscripcionesService | null;
	dataSource: InscripcionesDataSource | null;
	
	index: number;
	id: number;

	constructor(public httpClient: HttpClient,
				public dialog: MatDialog,
				public dataService: InscripcionesService,
				public toastrService: ToastrService) 
	{
		
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	ngOnInit(){
		this.loadData();
	}
	refresh() {
		this.loadData();
	}
	addNew() {
		
		const dialogRef = this.dialog.open(AddAlumnoDialogComponent, {
				data: {}//: {turno: Turno }
			});
			
			dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				// After dialog is closed we're doing frontend updates
				// For add we're just pushing a new row inside DataService
				this.inscripcionesDataBase.dataChange.value.push(this.dataService.getDialogData());
				this.refreshTable();
			}
		});
	}
	private refreshTable() {
		// Refreshing table using paginator
		// Thanks yeager-j for tips
		// https://github.com/marinantonio/angular-mat-table-crud/issues/12
		this.paginator._changePageSize(this.paginator.pageSize);
	}
	public loadData() {
		
		this.inscripcionesDataBase = new InscripcionesService(this.httpClient, this.toastrService);
		this.dataSource = new InscripcionesDataSource(this.inscripcionesDataBase, this.paginator, this.sort);
		fromEvent(this.filter.nativeElement, 'keyup')
		  // .debounceTime(150)
		  // .distinctUntilChanged()
		  .subscribe(() => {
			if (!this.dataSource) {
			  return;
			}
			this.dataSource.filter = this.filter.nativeElement.value;
		  });
		  
	}
}