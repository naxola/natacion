import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-datatables-users',
  templateUrl: './users-datatable.component.html',
  styleUrls: ['./users-datatable.component.css']
})
export class UsersDatatableComponent implements OnInit {

  public data: User[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(
    private userService: UserService) {
      this.loadAllUsers();
    }

  ngOnInit(): void {
    
  }
  private loadAllUsers(){
    this.userService.getAll().
      pipe(first())
        .subscribe(
          data => { 
            this.data = data['data']; 
            console.log(this.data);
        },
          error =>{
            console.log(error);
            //setTimeout(()=>this.toastrService.error("Algo ha ido mal al cargar los usuarios","Ooops..."));
        }
    );
  }
}