import { Injectable } from "@angular/core";
import { Product } from "../Model/product.model";
import { DataSource } from "./datastore";
import { Cart, User } from "./cart.model";
import { MainServiceService } from "../main-service.service";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
  })
export class CartService{

    public productList:Product[]=[];
    public cart = new Cart(0,'',new User(),0,0);
    public userBean = new User();
    public dialogueBox: boolean = false;
    constructor(
      private dataSource: DataSource,
      private mainService:MainServiceService,
      private router:Router
      ) {
        
       }

    addToCart(products: Product[]): void {
        console.log(products);
        this.cart.products=products;   
        this.mainService.getCartQuantity(this.cart.quantity);
        this.userBean.userId=1;
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
    



  }
