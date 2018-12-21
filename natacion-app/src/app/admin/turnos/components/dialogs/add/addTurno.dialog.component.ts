import { FormControl, Validators } from "@angular/forms";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Turno } from "../../../../../core/models/turno.model";
import { TurnosService } from "../../../../../core/services/turnos.service";

@Component({
    selector: 'app-addturno.dialog',
    templateUrl: './addTurno.dialog.component.html',
    styleUrls: ['./addTurno.dialog.component.css']
  })

export class AddTurnoDialogComponent {
    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);
    constructor(public dialogRef: MatDialogRef<AddTurnoDialogComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: Turno,
                public dataService: TurnosService){
    }
    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
          //this.formControl.hasError('email') ? 'Not a valid email' :
            '';
    }
    submit() {
        // emppty stuff
        }
      
        onNoClick(): void {
          this.dialogRef.close();
        }
      
        public confirmAdd(): void {
          console.log(this.data['fechaInicio']);
          console.log(this.data['fechaInicio']['_i']);
         
          this.dataService.addItem(this.data);
      }
}