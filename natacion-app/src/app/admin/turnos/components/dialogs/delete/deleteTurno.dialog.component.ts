
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { TurnosService } from '../../../../../core/services/turnos.service';


@Component({
  selector: 'app-deleteTurno.dialog',
  templateUrl: './deleteTurno.dialog.component.html',
  styleUrls: ['./deleteTurno.dialog.component.css']
})
export class DeleteTurnoDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTurnoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: TurnosService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteItem(this.data.id);
  }
}