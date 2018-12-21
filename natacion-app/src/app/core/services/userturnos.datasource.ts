import { CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Turno } from '../models/turno.model';
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, finalize} from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { TurnosService } from "./turnos.service";

export class UserTurnosDataSource implements DataSource<Turno>{
    
    public turnosSubject = new BehaviorSubject<Turno[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    renderedData: Turno[] = [];

    constructor(private configService: TurnosService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<Turno[]> {
        this.cargar();
        return this.turnosSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
    this.turnosSubject.complete();
    this.loadingSubject.complete();
    }
    
    loadTurnosDisponibles(){
        this.loadingSubject.next(true);
        this.configService.findTurnosDisponibles();
        this.turnosSubject = this.configService.dataChange; 
    }
    cargar(){
		this.turnosSubject
		.skip(1)
		.subscribe((data) => {
            this.renderedData = data;
            this.loadingSubject.next(false);
		});
	}
}