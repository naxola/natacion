import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Turno } from '../models/turno.model';
import { ConfigService } from "./config.service";
import { BehaviorSubject, Observable } from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";

export class ConfigurationDataSource implements DataSource<Turno>{
    
    public turnosSubject = new BehaviorSubject<Turno[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    fechaHoy = new Date();
    constructor(private configService: ConfigService) {}
    connect(collectionViewer: CollectionViewer): Observable<Turno[]> {
        return this.turnosSubject.asObservable();
        

    }
  
    disconnect(collectionViewer: CollectionViewer): void {
    this.turnosSubject.complete();
    this.loadingSubject.complete();
    }
    
    loadAllTurnos(yearTurno = 1, pageIndex = 1, pageSize = 10) {
        this.loadingSubject.next(true);
        this.configService.findAllTurnos(yearTurno, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((turnos) => {
                this.turnosSubject.next(turnos);
            }
         );              
    } 
    loadTurnosDisponibles(){
        this.loadingSubject.next(true);
        this.configService.findTurnosDisponibles()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((turnos) => {
                this.turnosSubject.next(turnos);
            }
         ); 
    }
}