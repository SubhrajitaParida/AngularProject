import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faInfoCircle, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../AuthService.service (1)';
import { DataSource } from '../CartModel/datastore';
import { CookieService } from 'ngx-cookie-service';
import { MainServiceService } from '../main-service.service ';
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

  constructor(private authService:AuthService,
    private service:MainServiceService,
    private datasource:DataSource,
    private cookieService:CookieService

    ){  
      }
        public isLoggedIn:boolean=false;
        public user:any=null;
        public amount?:number;
        public userId?:number;

        ngOnInit(): void {
          // alert(this.isLoggedIn)
          this.isLoggedIn=this.authService.isLogged()
          if(this.isLoggedIn){
            this.userId=this.authService.getUser().userId;
          }
          // this.getUserDetails();
          if(this.userId!=undefined){
            this.datasource.getCartDetailsBasedOnId(this.userId).subscribe(d=>{
              this.amount=d.quantity;
            })
          }
          this.service.main.subscribe((f)=>{
            this.amount=f;
          });

          if(this.isLoggedIn){
            // alert(this.isLoggedIn)
            this.user=this.authService.getUser();
          }
   
          }
          logout(){
            this.isLoggedIn=false
            this.authService.logout();
          }
          // getUserDetails() {
          //   // alert("Main Service");
          //   const userDetailsString = this.cookieService.get('userDetails');
          //   if (userDetailsString) {
          //   this.userDetails = JSON.parse(userDetailsString);
          //   this.userId=this.userDetails.userId;
          //   alert(this.userId);
          //   }
          // }

}