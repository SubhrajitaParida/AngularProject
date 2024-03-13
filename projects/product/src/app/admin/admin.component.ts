import { Component, OnInit } from '@angular/core';

import { faHome, faUser, faInfoCircle, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../AuthService.service (1)';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  faHome = faHome;
  faUser = faUser;
  faInfoCircle = faInfoCircle;
  faUserPlus = faUserPlus;
  faShoppingCart = faShoppingCart;

  public isLoggedIn:boolean=false;
  public user:any=null;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLogged();

    if(this.isLoggedIn){
      this.user=this.authService.getUser();
    }
  }

  logout(){
    this.isLoggedIn=false;
    this.authService.logout()
  }

}
