import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { Turno } from '../models/turno.model';

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

export class InscriptionsService{
    
    constructor(private http: HttpClient){}

    registerInscription(turnos: Turno[], id_student: number){
        var data = {id_student: id_student, turnos: turnos};
        return this.http.post(`${environment.API_URL}/api/v1/inscripcion`, data, httpOptions);
    }
}