import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { error } from 'console';
import { Product } from '../Model/product.model';
import { CartService } from '../CartModel/cart.service';
import { AuthService } from '../AuthService.service (1)';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
public productsId:any;
public productDetails:any={};
public productList:Product[]=[];
public isLoggedIn:boolean=false;


constructor(private route:ActivatedRoute,
   private data:DataSourceService, 
   private cartService:CartService,private router:Router,private snackBar: MatSnackBar,
   private authService:AuthService){
 
}

ngOnInit(): void {
  this.route.paramMap.subscribe(params=>{
    // alert(params.get('productId'));
    this.productsId=params.get('productId');
    this.getProductsById(this.productsId);
  })
}

getProductsById(productsId:any){
this.data.getProductsById(productsId).subscribe(data=>this.productDetails=data);  

}
private showSnackBar(message: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['custom-snackbar'];
  config.duration = 2000;
  config.verticalPosition = 'top';
  this.snackBar.open(message, 'Close', config);
}
addToCart(product:Product){
  this.isLoggedIn=this.authService.isLogged()
  if(this.isLoggedIn==false){
    this.showSnackBar("Please Signup to add products to your cart")
    this.router.navigate(['/medicine'])
  }
 else{
  product.quantityProduct=1;
  product.status="Added To Cart";
  this.productList.push(product);
  console.log(this.productList); 
  this.cartService.addToCart(this.productList); 
 }
 }

 
}
