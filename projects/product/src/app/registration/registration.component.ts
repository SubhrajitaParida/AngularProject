import { Component } from '@angular/core';
import { User } from '../UserModel/user.model';
import { DataSource } from '../UserModel/user.datasource';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})

export class RegistrationComponent {
  user:User = new User(0,"",0,"","","","","");
  public errorType=String;
  loginSuccessful: boolean = false;
  dialogue:boolean=false;

  constructor(private dataSource:DataSource) {
  }

  sendUserDetails(user:User){
    user.userRole="User";
    user.userStatus="Active";   
   
    this.dataSource.saveUser(user).subscribe(
      (data)=>{
       console.log(data);
       this.loginSuccessful=true;
       this.dialogue = true;
     },
    (error)=>{
      this.dialogue = true;
      this.loginSuccessful=false;
      this.errorType=error.error.message;
      console.log(error);
      
    }
   )
  }

  dialogueBox(){
    this.dialogue=false;
  }



}