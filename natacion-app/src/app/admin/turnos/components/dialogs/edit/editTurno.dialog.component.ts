import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TurnosService } from '../../../../../core/services/turnos.service';

@Component({
  selector: 'app-editTurno.dialog',
  templateUrl: './editTurno.dialog.component.html',
  styleUrls: ['./editTurno.dialog.component.css']
})
export class EditTurnoDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditTurnoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: TurnosService) {
              
               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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

  stopEdit(): void {
    this.dataService.updateItem(this.data);
  }
}