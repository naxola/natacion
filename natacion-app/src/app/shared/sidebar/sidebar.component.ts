import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
  
})
export class SidebarComponent implements OnInit {
	
    
    showMenu: string = '';
    showSubMenu: string = '';
    user: User;
    
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
        private route: ActivatedRoute,private userService: UserService
        ) {
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
