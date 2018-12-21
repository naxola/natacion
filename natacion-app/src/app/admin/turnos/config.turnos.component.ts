import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnosService } from '../../core/services/turnos.service';
import { TurnosDataSource } from '../../core/services/turnos.datasource';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { AddTurnoDialogComponent } from './components/dialogs/add/addTurno.dialog.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


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
	addNew() {
		
		const dialogRef = this.dialog.open(AddTurnoDialogComponent, {
				data: {}//: {turno: Turno }
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