import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from '../../core/services/user.service';
import { User, UserRole } from '../../core/models/user.model';
import { equalSegments } from '@angular/router/src/url_tree';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
	
    uRole: number;
    showMenu: string = '';
    showSubMenu: string = '';
    isAdmin: boolean;
    user: User;

    jwtHelper = new JwtHelperService();

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
    private setMenuAsRole(){
        const token = localStorage.getItem('token');
            const decodedToken = this.jwtHelper.decodeToken(token);
            console.log(decodedToken.roles[0]);
            switch(decodedToken.roles[0]){
                case "ADMIN_ROLE":
                    this.uRole = UserRole.ADMIN_ROLE;
                break;
                case "USER_ROLE":
                    this.uRole = UserRole.USER_ROLE;
                break;
                default:
                    this.uRole = UserRole.USER_ROLE;
                break;
            }
    }
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute,private userService: UserService
        ) {
            this.getUsuario();
            this.setMenuAsRole();
        } 
        private getUsuario(){
            this.userService.getUser()
            .subscribe(
            data => {
                this.user = data['data'];
            },
            error => {
                console.log(error);
            });
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
        
        //*ngIf="thing"
        
    }
}
