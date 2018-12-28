import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Turno} from '../models/turno.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { map } from "rxjs/operators";

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
export class TurnosService{
    dataChange: BehaviorSubject<Turno[]> = new BehaviorSubject<Turno[]>([]);

    // Temporarily stores data from dialogs
    dialogData: any;

    constructor(private httpClient: HttpClient,
                private toasterService: ToastrService){}

    get data(): Turno[] {
        return this.dataChange.value;
    }
    getDialogData() {
        return this.dialogData;
    }
    /** CRUD METHODS */
    getAll(): void {
        this.httpClient.get<Turno[]>(`${environment.API_URL}/api/v1/all_turnos`)
        .subscribe(data => {
            this.dataChange.next(data['data']);
            //this.toasterService.success('Datos cargados correctamente');
        },
        (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
        });
    }

    // DEMO ONLY, you can find working methods below
    addItem (turno: Turno): void {

        this.httpClient.post(`${environment.API_URL}/api/v1/turno`, turno, httpOptions)
        .subscribe(data => {
                //this.dataChange.next(data['data']);
                turno.id = data['data'].id;
                this.dialogData = turno;
                this.toasterService.success('Turno añadido correctamente');
            },
            error => {
                this.toasterService.error(error.name + ' ' + error.message, 'En serio??: ');
                
            });
            /*
            ,
            (err: HttpErrorResponse) => {
                this.toasterService.error(err.name + ' ' + err.message, 'En serio??: ');
          });
          */
    }



    deleteItem(id: number): void {
        this.httpClient.delete(`${environment.API_URL}/api/v1/turno/` + id).subscribe(data => {
            this.toasterService.success('Turno eliminado con exito');
          },
          (err: HttpErrorResponse) => {
            this.toasterService.error('Ha ocurrido un error: ' + err.name + ' ' + err.message);
          }
        );
      }

    updateItem(turno: Turno): void {
        console.log(turno);
        this.httpClient.put(`${environment.API_URL}/api/v1/turno/` + turno.id, turno).subscribe(data => {
            this.dialogData = turno;
            this.toasterService.success('Successfully edited');
          },
          (err: HttpErrorResponse) => {
            this.toasterService.error('Error occurred. Details: ' + err.name + ' ' + err.message);
          }
        );
    }

    findTurnosDisponibles(){
        this.httpClient.get(`${environment.API_URL}/api/turnos_disponibles`, {
            params: new HttpParams()
        }).subscribe(data => {
            this.dataChange.next(data['data']);
        },
        (err: HttpErrorResponse) => {
            this.toasterService.error(err.name + ' ' + err.message, 'Ha ocurrido un error: ');
      });
    }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/