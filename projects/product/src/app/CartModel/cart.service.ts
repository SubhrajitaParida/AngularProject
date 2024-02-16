import { Injectable } from "@angular/core";
import { Product } from "../Model/product.model";
import { DataSource } from "./datastore";
import { Cart, User } from "./cart.model";

@Injectable({
    providedIn: 'root'
  })
export class CartService{

    public productList:Product[]=[];
    public cart = new Cart(0,'',new User(),0,0);
    public userBean = new User();
    public dialogueBox: boolean = false;
    constructor(private dataSource: DataSource) { }

    addToCart(products: Product[]): void {
        console.log(products);
        this.cart.products=products;
        console.log(this.cart.products);
        
        this.userBean.userId=55;
        this.cart.user=this.userBean;
        
        this.dataSource.saveCartDetails(this.cart).subscribe(
        (result) => {
          console.log(result);
          this.cart=result;
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