import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment.prod';

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

export class UserService{
    private user: User;
    constructor(private http: HttpClient){}

    getAll() {
        return this.http.get<User[]>(`${environment.API_URL}/api/users`);
    }
    getUser() {
        return this.http.get(`${environment.API_URL}/api/v1/user`);
    }
    getById(id: number) {
        return this.http.get(`${environment.API_URL}/api/users/` + id);
    }
    registerUser(user: User){
        user.roles = ['USER_ROLE'];
        return this.http.post(`${environment.API_URL}/api/register`, user, httpOptions);
    }
    update(user: User) {
        return this.http.put(`${environment.API_URL}/api/users/` + user.id, user);
    }
    delete(id: number) {
        return this.http.delete(`${environment.API_URL}/api/users/` + id);
    }
    getRoles(){
        return this.user.roles;
    }
}
