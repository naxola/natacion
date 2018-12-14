import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { Turno } from '../../../../../../core/models/turno.model';
import { TurnosService } from '../../../../../../core/services/turnos.service';

@Component({
    selector: 'app-add.dialog',
    templateUrl: './add.dialog.component.html',
    styleUrls: ['./add.dialog.component.css']
  })

export class AddDialogComponent {
    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);
    constructor(public dialogRef: MatDialogRef<AddDialogComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: Turno,
                public dataService: TurnosService){

    }
    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :
          this.formControl.hasError('email') ? 'Not a valid email' :
            '';
    }
    submit() {
        // emppty stuff
        }
      
        onNoClick(): void {
          this.dialogRef.close();
        }
      
        public confirmAdd(): void {
          //this.dataService.addIssue(this.data);
      }
}