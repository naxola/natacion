import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnosService } from '../../core/services/turnos.service';
import { TurnosDataSource } from '../../core/services/turnos.datasource';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Turno } from '../../core/models/turno.model';
import { DeleteTurnoDialogComponent } from './components/dialogs/delete/deleteTurno.dialog.component';
import { AddTurnoDialogComponent } from './components/dialogs/add/addTurno.dialog.component';
import { EditTurnoDialogComponent } from './components/dialogs/edit/editTurno.dialog.component';

@Component({
	templateUrl: './config.turnos.component.html'
})
export class ConfigTurnosComponent implements OnInit {
	displayedColumns = ['id', 'nombre', 'localidad', 'horario', 'fechaInicio', 'fechaFin', 'fechaLimite', 'actions'];

	turnosDataBase: TurnosService | null;
	dataSource: TurnosDataSource | null;
	
	index: number;
	id: number;

	constructor(public httpClient: HttpClient,
				public dialog: MatDialog,
				public dataService: TurnosService,
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
	addNew(turno: Turno) {
		
		const dialogRef = this.dialog.open(AddTurnoDialogComponent, {
				data: {turno: turno }
			});
			
			dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				// After dialog is closed we're doing frontend updates
				// For add we're just pushing a new row inside DataService
				this.turnosDataBase.dataChange.value.push(this.dataService.getDialogData());
				this.refreshTable();
			}
		});
	}
	startEdit(i: number, id: number, nombre: string, localidad: string, horario: string, fechaInicio: Date, fechaFin: Date, fechaLimite: Date) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
		
    const dialogRef = this.dialog.open(EditTurnoDialogComponent, {
      data: {id: id, nombre: nombre, localidad: localidad, horario: horario, fecha_fin: fechaFin, fecha_inicio: fechaInicio, fecha_limite: fechaLimite}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.turnosDataBase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.turnosDataBase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
}
	deleteItem(i: number, id: number, nombre: string, localidad: string) {
		this.index = i;
		this.id = id;
		const dialogRef = this.dialog.open(DeleteTurnoDialogComponent, {
		  data: {id: id, nombre: nombre, localidad: localidad}
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  if (result === 1) {
			const foundIndex = this.turnosDataBase.dataChange.value.findIndex(x => x.id === this.id);
			// for delete we use splice in order to remove single object from DataService
			this.turnosDataBase.dataChange.value.splice(foundIndex, 1);
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
		
		this.turnosDataBase = new TurnosService(this.httpClient, this.toastrService);
		this.dataSource = new TurnosDataSource(this.turnosDataBase, this.paginator, this.sort);
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