import { Component, OnInit } from '@angular/core';
import { CartService } from '../CartModel/cart.service';

import { Router } from '@angular/router';
import { DataSource } from '../CartModel/datastore';
import { Cart, User } from '../CartModel/cart.model';
import { Product } from './../Model/product.model';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  public productsList: Product[] = [];
  public updateProductList: Product[] = [];
  public cart = new Cart(0,'',new User(),0,0);
  public userBean = new User();
  public dialogueBox:boolean=false;
  public cartId:number=0;
  public customQuantity:number=0;


  constructor(
    private router: Router,
    private cartService: CartService,
    private dataSource: DataSource,
    private mainService:MainServiceService
  ) {
    this.getCartDetailsBasedOnId();
  }

  getCartDetails() {
    this.cart = this.cartService.sendCartDetails();
    console.log(this.cart);
    return this.cart;
  }

  getCartDetailsBasedOnId() {
    this.userBean.userId=1;
    this.dataSource.getCartDetailsBasedOnId(this.userBean.userId).subscribe(
      (data) => {
        console.log(data);
        this.cart=data;
        this.productsList=data.products;
        this.mainService.getCartQuantity(this.cart.quantity);
        this.dialogueBox = this.productsList.length > 0;

        console.log(this.productsList);
      },
      (error) => {
        console.error('error no data found');
        this.dialogueBox=false;
      }
    );
  }


  removeProduct(product:Product) {
  console.log("delete");
  
    this.dataSource.deleteBasedOnId(this.cart.cartId,product.productId).subscribe(
      (data)=>{
        console.log("DELETED PRODUCT",data.products);    
        this.getCartDetailsBasedOnId();    
      },
      (error)=>{
        console.log("Error");
        
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
        console.log(this.cart.products);
      },(error)=>{
        console.log(error);       
      })
    console.log(productUpdate);   
  }
}

