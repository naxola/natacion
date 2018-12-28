import { DataSource} from "@angular/cdk/collections";
import { Turno } from '../models/turno.model';
import { TurnosService } from "./turnos.service";
import { MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject, merge, Observable} from 'rxjs';
import { map} from 'rxjs/operators';

export class TurnosDataSource extends DataSource<Turno>{

    _filterChange = new BehaviorSubject('');
    get filter(): string {
        return this._filterChange.value;
    }
    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    filteredData: Turno[] = [];
    renderedData: Turno[] = [];
    constructor(
        private _turnosDataBase: TurnosService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
            super();
                // Reset to the first page when the user changes the filter.
            this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
        }
        

    connect(): Observable<Turno[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._turnosDataBase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page
        ];
        this._turnosDataBase.getAll();
        

        return merge(...displayDataChanges).pipe(map( () => {
                // Filter data
                this.filteredData = this._turnosDataBase.data.slice().filter((turno: Turno) => {
                    const searchStr = (turno.id + turno.nombre + turno.localidad + turno.horario).toLowerCase();
                    return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
                });
        
                // Sort filtered data
                const sortedData = this.sortData(this.filteredData.slice());
        
                // Grab the page's slice of the filtered sorted data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                
                this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
                return this.renderedData;
            }
        ));
    }
  
    disconnect(): void {

    }

   
    /** Returns a sorted copy of the database data. */
  sortData(data: Turno[]): Turno[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'nombre': [propertyA, propertyB] = [a.nombre, b.nombre]; break;
                case 'Localidad': [propertyA, propertyB] = [a.localidad, b.localidad]; break;
                case 'horario': [propertyA, propertyB] = [a.horario, b.horario]; break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}