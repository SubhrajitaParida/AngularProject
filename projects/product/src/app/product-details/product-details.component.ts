import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSourceService } from '../data-source.service';
import { error } from 'console';
import { Product } from '../Model/product.model';
import { CartService } from '../CartModel/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
public productsId:any;
public productDetails:any={};
public productList:Product[]=[];


constructor(private route:ActivatedRoute, private data:DataSourceService, private cartService:CartService){
 
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
addToCart(product:Product){
  product.quantityProduct=1;
  this.productList.push(product);
  console.log(this.productList); 
  this.cartService.addToCart(this.productList);  
 }
}
