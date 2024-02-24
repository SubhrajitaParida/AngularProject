import { Injectable } from "@angular/core";
import { Product } from "../Model/product.model";
import { DataSource } from "./datastore";
import { Cart, User } from "./cart.model";

import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { MainServiceService } from "../main-service.service ";
import { AuthService } from "../AuthService.service (1)";


@Injectable({
    providedIn: 'root'
  })
export class CartService{

    public productList:Product[]=[];
    public cart = new Cart(0,'',new User(),0,0);
    public userBean = new User();
    public dialogueBox: boolean = false;

    public userDetails:any;
    // public userId?:String;
    constructor(
      private dataSource: DataSource,
      private mainService:MainServiceService,
      private router:Router,
      private authService:AuthService,
      private cookieService:CookieService
      ) {
        this.userBean.userId=this.authService.getUser().userId;
       }

    addToCart(products: Product[]): void {
      // alert("cart service")

        console.log(products);
        this.cart.status="Active";
        this.cart.products=products;   
        this.mainService.getCartQuantity(this.cart.quantity);
        // this.userBean.userId=Number(this.userId);
        this.cart.user=this.userBean;        
        this.dataSource.saveCartDetails(this.cart).subscribe(
        (result) => {
          console.log(result);
          this.cart=result;
          this.mainService.getCartQuantity(this.cart.quantity);
        },
        (error) => {
          console.error(error);
        }
    );
  }


    sendCartDetails(): Cart {
        console.log("CartService",this.cart);   
        return this.cart;
    }


  //   getUserDetails() {
  //     const userDetailsString = this.cookieService.get('userDetails');
  //     if (userDetailsString) {
  //     this.userDetails = JSON.parse(userDetailsString);
  //     // this.userId=this.userDetails.userId;
  //     // console.log(this.userId);
      
  // }
    

}
