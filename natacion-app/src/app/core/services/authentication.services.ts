import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

export class AuthenticationService{
    constructor(private http: HttpClient){}
    login(email: string, password: string){

        return this.http.post<any>(`${environment.API_URL}/api/login_check`, { _username: email, _password: password }, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   
                    localStorage.setItem('token', JSON.stringify(user));
                }

                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }
}