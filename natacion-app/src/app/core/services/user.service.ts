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
    
    constructor(private http: HttpClient){}
    
    registerUser(user: User){
        return this.http.post(`${environment.API_URL}/api/register`, user, httpOptions);
    }
}
