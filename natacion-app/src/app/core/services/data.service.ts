import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import { User } from '../models/user.model';


@Injectable({ 
    // we declare that this service should be created
    // by the root application injector.
    providedIn: 'root' 
})

export class DataService{
    
    constructor(private userService: UserService){}
    public user: User;

    getUser() {
        this.userService.getUser()
            .subscribe(
            data => {
                console.log("Llamada de datos");
                this.user = data['data'];
                console.log(this.user);
                return this.user;
            },
            error => {
                console.log(error);
            });
        return this.user;
    }
 
}
