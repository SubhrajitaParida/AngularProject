import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartModel/cart.service';

import { Router } from '@angular/router';
import { DataSource } from '../CartModel/datastore';
import { Cart, User } from '../CartModel/cart.model';
import { Product } from './../Model/product.model';
import { CookieService } from 'ngx-cookie-service';
import { MainServiceService } from '../main-service.service ';
import { AuthService } from '../AuthService.service (1)';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public productsList: Product[] = [];
  public updateProductList: Product[] = [];
  public cart = new Cart(0,'',new User(),0,0);
  public dialogueBox:boolean=false;
  public cartId:number=0;
  public userDetails: any;
  public userId?: number;
  

  constructor(
    private router: Router,
    private cartService: CartService,
    private dataSource: DataSource,
    private mainService:MainServiceService,
    private cookieService: CookieService,
    private authService:AuthService
  ) {
  
    this.userId=this.authService.getUser().userId;
    this.getCartDetailsBasedOnId();
  }

  getCartDetails() {
    this.cart = this.cartService.sendCartDetails();
    return this.cart;
  }

  getCartDetailsBasedOnId() {
    if(this.userId!=undefined){
    this.dataSource.getCartDetailsBasedOnId(this.userId).subscribe(
      (data) => {
        this.cart=data;
        if(this.cart.status=="Active"){
          this.productsList=data.products;
          this.mainService.getCartQuantity(this.cart.quantity);
          this.dialogueBox = this.productsList.length > 0;          
        }
        
      },
      (error) => {
        this.dialogueBox=false;
      }
    );
    }
  }


  removeProduct(product:Product) {
 
  
    this.dataSource.deleteBasedOnId(this.cart.cartId,product.productId).subscribe(
      (data)=>{
        this.getCartDetailsBasedOnId();    
      },
      (error)=>{
        // console.log("Error");
        
      }
    )
  }

  onSelectChange(event: any, productUpdate: Product) {
    console.log(this.cart);   
    this.updateProductList.push(productUpdate);
    this.cart.products=this.updateProductList;
    this.dataSource.updateProductDetails(this.cart,productUpdate.productId).subscribe(
      (data)=>{
        this.cart.products=data.products;
        this.cart.amount=data.amount;
        this.mainService.getCartQuantity(this.cart.quantity);
      },(error)=>{
        // console.log(error);       
      })
    
  }
}

