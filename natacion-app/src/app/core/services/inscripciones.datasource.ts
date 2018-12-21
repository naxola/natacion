import { DataSource } from "@angular/cdk/collections";
import { RegTurnoUserStudent } from "../models/regturnouserstudent.model";
import { InscripcionesService } from "./inscripciones.service";
import { MatPaginator, MatSort } from "@angular/material";
import { BehaviorSubject, merge, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export class InscripcionesDataSource extends DataSource<RegTurnoUserStudent>{

    filteredData: RegTurnoUserStudent[] = [];
    renderedData: RegTurnoUserStudent[] = [];
    _filterChange = new BehaviorSubject('');

    constructor(
        private _configService: InscripcionesService,
        public _paginator: MatPaginator,
        public _sort: MatSort) {
            super();
                // Reset to the first page when the user changes the filter.
            this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
        }
        connect(): Observable<RegTurnoUserStudent[]> {
            // Listen for any changes in the base data, sorting, filtering, or pagination
            const displayDataChanges = [
                this._configService.dataChange,
                this._sort.sortChange,
                this._filterChange,
                this._paginator.page
            ];
            this._configService.getAll();

            return merge(...displayDataChanges)
                .pipe(map( () => {
                    // Filter data
                    this.filteredData = this._configService.data.slice().filter((row: RegTurnoUserStudent) => {
                        const searchStr = (row.userFirstName + row.userLastName).toLowerCase();
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
        get filter(): string {
            return this._filterChange.value;
        }
        set filter(filter: string) {
            this._filterChange.next(filter);
        }
        /** Returns a sorted copy of the database data. */
      sortData(data: RegTurnoUserStudent[]): RegTurnoUserStudent[] {
        if (!this._sort.active || this._sort.direction === '') {
          return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
      
            switch (this._sort.active) {
              case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
              case 'userFirstName': [propertyA, propertyB] = [a.userFirstName, b.userFirstName]; break;
              case 'userLastName': [propertyA, propertyB] = [a.userLastName, b.userLastName]; break;
            }
      
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
          });
    }

        disconnect(): void {
    
        }
    
}