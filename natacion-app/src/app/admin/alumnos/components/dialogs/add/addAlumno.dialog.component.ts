import { FormControl, Validators } from "@angular/forms";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Student } from "../../../../../core/models/student.model";
import { InscripcionesService } from "../../../../../core/services/inscripciones.service";


@Component({
    selector: 'app-addAlumno.dialog',
    templateUrl: './addAlumno.dialog.component.html',
    styleUrls: ['./addAlumno.dialog.component.css']
  })

export class AddAlumnoDialogComponent {
    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);
    constructor(public dialogRef: MatDialogRef<AddAlumnoDialogComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: Student,
                public dataService: InscripcionesService){
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
          //this.dataService.addItem(this.data);
      }
}