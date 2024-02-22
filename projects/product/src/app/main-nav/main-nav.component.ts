import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faInfoCircle, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../AuthService.service (1)';
import { MainServiceService } from '../main-service.service';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit {
  faHome = faHome;
  faUser = faUser;
  faInfoCircle = faInfoCircle;
  faUserPlus = faUserPlus;
  faShoppingCart = faShoppingCart;

  constructor(private authService:AuthService,private service:MainServiceService){}
  public isLoggedIn:boolean=false;
  public user:any=null;
  public amount?:number;


  ngOnInit(): void {
    // alert(this.isLoggedIn)
    // this.isLoggedIn=this.authService.isLogged()
    this.service.main.subscribe((f)=>{
      this.amount=f;
    });
    if(this.isLoggedIn){
      alert(this.isLoggedIn)
      this.user=this.authService
    }
   
  }
  logout(){
    this.authService.logout();
  }
}



