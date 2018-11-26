import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { StudentService } from '../../core/services/student.service';
import { Student } from '../../core/models/student.model';
 
@Component({
  selector: 'cardStudent',
  templateUrl: './cardStudent.component.html'
})
export class CardStudentComponent {
  students: Student[] = [];
  constructor(private studentService: StudentService){
    this.loadAllStudents();
  }
  private loadAllStudents(){
    this.studentService.getAllFromUser().
    pipe(first())
    .subscribe(
      data => { 
        this.students = data['data']; 
        console.log(this.students);
      },
      error =>{
        console.log(error);
      }
  );
  }
}