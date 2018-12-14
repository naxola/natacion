import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { AddDialogComponent } from './components/dialogs/add/add.dialog.component';
import { Turno } from '../../../core/models/turno.model';
import { TurnosService } from '../../../core/services/turnos.service';
import { TurnosDataSource } from '../../../core/services/turnos.datasource';
import { fromEvent } from 'rxjs';

@Component({
	templateUrl: './reg-turno.component.html'
})

export class RegistroTurnoComponent implements OnInit{
	displayedColumns = ['id', 'nombre', 'localidad', 'horario', 'fechaInicio', 'fechaFin', 'fechaLimite', 'actions'];

	turnosDataBase: TurnosService | null;
	dataSource: TurnosDataSource | null;
	
	index: number;
	id: number;

	constructor(public httpClient: HttpClient,
				public dialog: MatDialog,
				public dataService: TurnosService) 
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
		
		const dialogRef = this.dialog.open(AddDialogComponent, {
				data: {turno: Turno }
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
	private refreshTable() {
		// Refreshing table using paginator
		// Thanks yeager-j for tips
		// https://github.com/marinantonio/angular-mat-table-crud/issues/12
		this.paginator._changePageSize(this.paginator.pageSize);
	}
	public loadData() {
		
		this.turnosDataBase = new TurnosService(this.httpClient);
		this.dataSource = new TurnosDataSource(this.turnosDataBase, this.paginator, this.sort);
		fromEvent(this.filter.nativeElement, 'keyup')
		  // .debounceTime(150)
		  // .distinctUntilChanged()
		  .subscribe(() => {
			if (!this.dataSource) {
			  return;
			}
			console.log(this.dataSource);
			this.dataSource.filter = this.filter.nativeElement.value;
		  });
		  
	}
}