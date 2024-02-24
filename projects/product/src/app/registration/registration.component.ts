import { Component } from '@angular/core';
import { User } from '../UserModel/user.model';
import { DataSource } from '../UserModel/user.datasource';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  user:User = new User(0,"",0,"","","","","");
  public errorType:String='';
  loginSuccessful: boolean = false;
  dialogue:boolean=false;

  constructor(private dataSource:DataSource,
    private cookieService: CookieService, 
    private http: HttpClient,
    private location: Location) {
  }

  sendUserDetails(user:User){
    user.userRole="User";
    user.userStatus="Active";   
   
    this.dataSource.saveUser(user).subscribe(
      (data)=>{
      this.cookieService.set('userDetails', JSON.stringify(data));
       console.log(data);
       this.loginSuccessful=true;
       this.dialogue = true;
     },
    (error)=>{
      this.loginSuccessful=false;
      this.dialogue = true;
      this.errorType='User Registration Failed '+''+error.error.message;
      console.log(error);
      
    }
   )
  }

    reloadPage() {
      window.location.reload();
  }
}