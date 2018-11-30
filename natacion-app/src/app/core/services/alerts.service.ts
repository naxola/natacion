import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { stringify } from 'querystring';

export enum AlertTypes{
    ALERT_ERROR,
    ALERT_SUCCESS,
    ALERT_INFO,
    ALERT_WARNING
}
export interface AlertMessage{
    text:string;
    type:AlertTypes;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public message: AlertMessage;
    private dirtyMessage: boolean; //Con esto conseguimos que solo el primer elemento que lea el mensaje pueda recibirlo
    constructor(){
       // this.message = "";
    }

    setMessage (data:AlertMessage) {
        this.message = data;
        this.setDirty();
    }
    getMessage () {
        this.dirtyMessage = false;
        return this.message;
    }
    setDirty()
    {
        this.dirtyMessage  = true;
    }
    isDirty()
    {
        return this.dirtyMessage;
    }
    /*
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    */
}