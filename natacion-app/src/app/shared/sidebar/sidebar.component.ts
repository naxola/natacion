import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";

import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';
import { AuthenticationService } from '../../core/services/authentication.services';
import { JwtHelperService  } from '@auth0/angular-jwt';

declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
	
    jwtHelper: JwtHelperService;
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
            
        } else {
            this.showMenu = element; 
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
            
        } else {
            this.showSubMenu = element; 
        }
    }
    
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute,private userService: UserService, 
        private authService: AuthenticationService
        ) {
        
    } 
    logout(){
        console.log("Salir");
        //this.authService.logout();
    }
    // End open close
    ngOnInit() {
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
        $(function () {
            $(".sidebartoggler").on('click', function() {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");
                     
                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });
        this.jwtHelper = new JwtHelperService;
        const token = localStorage.getItem('currentUser');
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log(decodedToken);
        
        if(!localStorage.getItem('currentUserData'))
        {
            console.log("No hay usuario");
            this.userService.getUser()
		    .subscribe(
			data => {
				localStorage.setItem('currentUserData', JSON.stringify(data));
			},
			error => {
				console.log(error);
			});
        }
    }
}
