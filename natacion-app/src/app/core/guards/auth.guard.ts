import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable({ 
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root' 
})

export class AuthGuard implements CanActivate {

  constructor(public router: Router/*, public jwtHelper: JwtHelperService*/) {
    
  }
  jwtHelper: JwtHelperService;
  token: string;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = localStorage.getItem('token');
    //Evaluamos si hay token.
    if (this.token) {
      this.jwtHelper = new JwtHelperService;
      // Además debe cumplir que no ha expirado.
        if(!this.jwtHelper.isTokenExpired(this.token)){
          return true;
        }       
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/authentication/login2'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}