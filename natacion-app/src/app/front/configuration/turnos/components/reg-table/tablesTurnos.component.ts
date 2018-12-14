import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../../core/services/config.service';
import { ConfigurationDataSource } from '../../../../../core/services/configuration.datasource';

@Component({
    selector: 'tabla-turnos',
	templateUrl: './tablesTurnos.component.html'
})
export class TablesTurnosComponent implements OnInit {

	dataSource: ConfigurationDataSource;
	displayedColumns= ["turnoNombre", "localidad", "fechaInicio", "fechaFin", "fechaLimite"];

	constructor(private configService: ConfigService) 
	{

	}
    ngOnInit(){
        this.dataSource = new ConfigurationDataSource(this.configService);
		this.refresh();
	}
	public refresh(){
		this.dataSource.loadAllTurnos();
	}
}