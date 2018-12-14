import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { Turno } from '../models/turno.model';
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({ 
    // we declare that this service should be created
    // by the root application injector.
    providedIn: 'root' 
})

export class ConfigService{

    constructor(private http: HttpClient){}
    getAll() {
        return this.http.get<Turno[]>(`${environment.API_URL}/api/v1/turno`);
    }
    registrarTurno(turno: Turno){
        return this.http.post(`${environment.API_URL}/api/v1/turno`, turno, httpOptions);
    }
    update(turno: Turno) {
        return this.http.put(`${environment.API_URL}/api/users/` + turno.id, turno);
    }
    delete(id: number) {
        return this.http.delete(`${environment.API_URL}/api/users/` + id);
    }

    findAllTurnos(yearTurno:number, pageNumber = 1, pageSize = 3): Observable<Turno[]> {
        return this.http.get(`${environment.API_URL}/api/v1/turnos`, {
            params: new HttpParams()
                .set('year', yearTurno.toString())
                .set('pagina', pageNumber.toString())
                .set('limite', pageSize.toString())
        }).pipe(
            map(res => res["data"])
        );
    }
    findTurnosDisponibles(): Observable<Turno[]> {
        return this.http.get(`${environment.API_URL}/api/v1/turnos_disponibles`, {
            params: new HttpParams()
//                .set('year', yearTurno.toString())
        }).pipe(
            map(res => res["data"])
        );
    }
}
