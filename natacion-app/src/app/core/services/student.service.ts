import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { Student } from '../models/student.model';

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

export class StudentService{
    
    constructor(private http: HttpClient){}

    getAll() {
        //return this.http.get<Student[]>(`${environment.API_URL}/api/v1/student`);
    }
    getAllFromUser() {
        return this.http.get<Student[]>(`${environment.API_URL}/api/v1/student`);
    }
    getById(id: number) {
        return this.http.get(`${environment.API_URL}/api/vi/student/` + id);
    }
    registerStudent(student: Student){
        return this.http.post(`${environment.API_URL}/api/v1/student`, student, httpOptions);
    }
    update(student: Student) {
        return this.http.put(`${environment.API_URL}/api/v1/student/` + student.id, student);
    }

    delete(id: number) {
        return this.http.delete(`${environment.API_URL}/api/student/` + id);
    }
}
