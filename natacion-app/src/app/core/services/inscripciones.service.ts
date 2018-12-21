import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import swal from 'sweetalert2';
import { RegTurnoUserStudent } from '../models/regturnouserstudent.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

export class InscripcionesService{

    private registeringSubject = new BehaviorSubject<{bt1:boolean, bt2:boolean}>({bt1:false, bt2:false});
    public loading$ = this.registeringSubject.asObservable();
    dataChange: BehaviorSubject<RegTurnoUserStudent[]> = new BehaviorSubject<RegTurnoUserStudent[]>([]);
    // Temporarily stores data from dialogs
    dialogData: any;
    
    constructor(private httpClient: HttpClient, private toastr: ToastrService){
        
    }
    get data(): RegTurnoUserStudent[] {
        return this.dataChange.value;
    }
    getDialogData() {
        return this.dialogData;
    }
    getAll(): void {
        this.httpClient.get<RegTurnoUserStudent[]>(`${environment.API_URL}/api/v1/all_registers`).subscribe(data => {
            console.log(data);

           // this.dataChange.next(this.aux);
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
    }

    registerInscription(data: RegTurnoUserStudent): Observable<{bt1:boolean, bt2:boolean}>{
        
        
        this.httpClient.post(`${environment.API_URL}/api/inscripcion`, JSON.stringify(data), httpOptions)
        .subscribe(data => {
            swal({
                title: 'Alumno inscrito correctamente.',
                text: 'Se enviará un mail con los datos del registro al correo que nos has proporcionado. ¿Quieres inscribir a otro alumno?',
                type: 'success',
                showCancelButton: true,
                confirmButtonText: 'Sí, inscribir a otro alumno.',
                cancelButtonText: 'No, en otro momento'
              }).then((result) => {
                if (result.value) {
                    this.registeringSubject.next({bt1:true, bt2:false});
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    this.registeringSubject.next({bt1:false, bt2:true});
                }
                
              });
            },
            /*
            (err: HttpErrorResponse) => {
                swal( err.name +' '+ err.message, 'Ha ocurrido un error: ', 'error');
            },*/
            error => {
                swal( 'Vaya... parece que algo ha ido mal ',  error,'error');
            }
        );
        return this.registeringSubject.asObservable();
        
       
    }

}